import {
	FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text/Text';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	applyButton,
	sideBarState,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	const closeSidebar = useCallback(() => setOpen(false), []);
	const toggleForm = useCallback(() => setOpen((prev) => !prev), []);

	const handleReset = useCallback(() => {
		resetButton();
		closeSidebar();
	}, [resetButton, closeSidebar]);

	const handleSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			applyButton(event);
			closeSidebar();
		},
		[applyButton, closeSidebar]
	);

	useEffect(() => {
		const handleClickOut = (event: MouseEvent) => {
			if (open && ref.current && !ref.current.contains(event.target as Node)) {
				closeSidebar();
			}
		};

		document.addEventListener('mousedown', handleClickOut);
		return () => document.removeEventListener('mousedown', handleClickOut);
	}, [open, closeSidebar]);

	const formOptions = useMemo(
		() => ({
			fontFamilyOptions,
			fontSizeOptions,
			fontColors,
			backgroundColors,
			contentWidthArr,
		}),
		[]
	);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open} />
			{open && <div className={styles.overlay} onClick={closeSidebar} />}
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase as='h3' align='center'>
						Set options
					</Text>
					<Select
						selected={sideBarState.fontFamilyOption}
						options={formOptions.fontFamilyOptions}
						onChange={fontFamily}
						title='Font'
					/>
					<RadioGroup
						name='fontSize'
						options={formOptions.fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={fontSize}
						title='Font size'
					/>
					<Select
						selected={sideBarState.fontColor}
						options={formOptions.fontColors}
						onChange={fontColor}
						title='Font color'
					/>
					<Separator />
					<Select
						selected={sideBarState.backgroundColor}
						options={formOptions.backgroundColors}
						onChange={backgroundColor}
						title='Background color'
					/>
					<Select
						selected={sideBarState.contentWidth}
						options={formOptions.contentWidthArr}
						onChange={contentWidth}
						title='Content width'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Reset' type='clear' onClick={handleReset} />
						<Button title='Apply' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

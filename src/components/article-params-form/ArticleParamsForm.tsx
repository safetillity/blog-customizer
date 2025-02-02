import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
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
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text/Text';

export const ArticleParamsForm = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const ref = useRef<HTMLFormElement | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
	const toggleSidebar = useCallback(
		() => setIsSidebarOpen((prev) => !prev),
		[]
	);

	const handleReset = useCallback(() => {
		setFormState(defaultArticleState);
		closeSidebar();
	}, [closeSidebar]);

	const applyCSSVars = () => {
		const variables = {
			'--font-family': formState.fontFamilyOption.value,
			'--font-size': formState.fontSizeOption.value,
			'--font-color': formState.fontColor.value,
			'--container-width': formState.contentWidth.value,
			'--bg-color': formState.backgroundColor.value,
		};

		Object.entries(variables).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	};

	const handleSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			applyCSSVars();
			closeSidebar();
		},
		[formState, closeSidebar]
	);

	const handleChange = useCallback(
		(key: keyof typeof formState) => (select: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: select }));
		},
		[]
	);

	useEffect(() => {
		const handleClickOut = (event: MouseEvent) => {
			if (
				isSidebarOpen &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				closeSidebar();
			}
		};

		if (isSidebarOpen) {
			document.addEventListener('mousedown', handleClickOut);
		} else {
			document.removeEventListener('mousedown', handleClickOut);
		}

		return () => document.removeEventListener('mousedown', handleClickOut);
	}, [isSidebarOpen, closeSidebar]);

	const formOptions = {
		fontFamilyOptions,
		fontSizeOptions,
		fontColors,
		backgroundColors,
		contentWidthArr,
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			{isSidebarOpen && (
				<div className={styles.overlay} onClick={closeSidebar} />
			)}
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} ref={ref} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase as='h3' align='center'>
						Set options
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={formOptions.fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Font'
					/>
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={formOptions.fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						title='Font size'
					/>
					<Select
						selected={formState.fontColor}
						options={formOptions.fontColors}
						onChange={handleChange('fontColor')}
						title='Font color'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={formOptions.backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Background color'
					/>
					<Select
						selected={formState.contentWidth}
						options={formOptions.contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Content width'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

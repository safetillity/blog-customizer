import { FormEvent, useEffect, useRef, useState } from 'react';
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
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text/Text';

export type ArticleParamsFormProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setArticleState } = props;

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const ref = useRef<HTMLFormElement | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	const handleChange =
		(key: keyof ArticleStateType) => (select: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: select }));
		};

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOut = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOut);

		return () => {
			document.removeEventListener('mousedown', handleClickOut);
		};
	}, [isSidebarOpen]);

	return (
		<>
			<ArrowButton
				onClick={() => setIsSidebarOpen((prev) => !prev)}
				isOpen={isSidebarOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} ref={ref} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase as='h3' align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
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

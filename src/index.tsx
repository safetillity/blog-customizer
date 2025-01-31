import { StrictMode, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { useArticleParams } from './components/article-params-form/hooks/useArticleParams';
import { OptionType } from './constants/articleProps';

export const App = () => {
	const { sideBarState, state, updateState, applyState, resetState } =
		useArticleParams();

	const applyCSSVars = () => {
		const variables = {
			'--font-family': state.fontFamilyOption.value,
			'--font-size': state.fontSizeOption.value,
			'--font-color': state.fontColor.value,
			'--container-width': state.contentWidth.value,
			'--bg-color': state.backgroundColor.value,
		};

		Object.entries(variables).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		applyCSSVars();
		applyState(event);
	};

	const handleChange = useCallback(
		(key: keyof typeof sideBarState) => (select: OptionType) => {
			updateState({ [key]: select });
		},
		[updateState]
	);

	return (
		<main className={styles.main}>
			<ArticleParamsForm
				fontFamily={handleChange('fontFamilyOption')}
				fontSize={handleChange('fontSizeOption')}
				fontColor={handleChange('fontColor')}
				backgroundColor={handleChange('backgroundColor')}
				contentWidth={handleChange('contentWidth')}
				resetButton={resetState}
				applyButton={handleApply}
				sideBarState={sideBarState}
			/>
			<Article />
		</main>
	);
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

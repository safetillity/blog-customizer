import { useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../../constants/articleProps';

export const useArticleParams = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateState = (newState: ArticleStateType) =>
		setArticleState((prevState) => ({
			...prevState,
			...newState,
		}));

	const applyState = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const resetState = () => {
		setArticleState(defaultArticleState);
	};

	return {
		sideBarState: articleState,
		state: articleState,
		updateState,
		applyState,
		resetState,
	};
};

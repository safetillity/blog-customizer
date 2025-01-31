import { useState, useCallback } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../../constants/articleProps';

export const useArticleParams = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateState = useCallback((newState: Partial<ArticleStateType>) => {
		setArticleState((prevState) => ({ ...prevState, ...newState }));
	}, []);

	const applyState = useCallback((event: React.FormEvent) => {
		event.preventDefault();
	}, []);

	const resetState = useCallback(() => {
		setArticleState(defaultArticleState);
	}, []);

	return {
		sideBarState: articleState,
		state: articleState,
		updateState,
		applyState,
		resetState,
	};
};

import styles from '../../styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
export const App = () => {
	return (
		<main className={styles.main}>
			<ArticleParamsForm />
			<Article />
		</main>
	);
};

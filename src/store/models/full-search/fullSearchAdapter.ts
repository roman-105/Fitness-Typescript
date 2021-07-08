import formatMessage from 'format-message';
import {
  IFullSearchResponse,
  IWorkoutSearchResponse,
  IProgramSearchResponse,
  IArticleSearchResponse,
  IRecipesSearchResponse
} from '../../../services/response-types';
import DateUtils from '../../../utils/dateUtils';

export type FullSearchCardInfoType = {
  key: string;
  title: string;
  image?: string;
  subtitle?: string;
};
export interface IFullSearchContent {
  workouts: { data: IWorkoutSearchResponse; cardInfo: FullSearchCardInfoType }[];
  programs: { data: IProgramSearchResponse; cardInfo: FullSearchCardInfoType }[];
  nutrition: {
    data: IArticleSearchResponse | IRecipesSearchResponse;
    cardInfo: FullSearchCardInfoType;
  }[];
  lifestyle: { data: IArticleSearchResponse; cardInfo: FullSearchCardInfoType }[];
}

interface IArticleCategory {
  name: 'Lifestyle' | 'Nutrition';
}

const isBlogArticle = (
  item: IArticleSearchResponse | IRecipesSearchResponse
): item is IArticleSearchResponse => {
  const categories = (item as IArticleSearchResponse).category as IArticleCategory[];
  return categories?.length > 0;
};

const FullSearchAdapter = {
  transformWorkouts: (workouts: IWorkoutSearchResponse[]): IFullSearchContent['workouts'] => {
    return workouts.map((workout) => {
      const subtitleArr = [];
      if (workout.duration) subtitleArr.push(DateUtils.formatHoursToMinutes(workout.duration));
      if (workout.level && workout.level.length > 0)
        subtitleArr.push(workout.level.map((level) => level.title).join(' - '));
      return {
        data: workout,
        cardInfo: {
          key: workout.id,
          title: workout.name,
          subtitle: subtitleArr.join(' | '),
          image: workout.picture?.url
        }
      };
    });
  },
  transformPrograms: (programs: IProgramSearchResponse[]): IFullSearchContent['programs'] => {
    return programs.map((program) => {
      const subtitleArr = [];
      if (program.duration && program.durationPeriod)
        subtitleArr.push(`${program.duration} ${program.durationPeriod.toLowerCase()}`);
      if (program.level && program.level.length > 0)
        subtitleArr.push(program.level.map((level) => level.title).join(' - '));

      return {
        data: program,
        cardInfo: {
          key: program.id,
          title: program.name,
          subtitle: subtitleArr.join(' | '),
          image: program.picture?.url
        }
      };
    });
  },
  transformNutrition: (
    nutrition: (IArticleSearchResponse | IRecipesSearchResponse)[]
  ): IFullSearchContent['nutrition'] => {
    return nutrition.map((nutritionItem) => {
      if (isBlogArticle(nutritionItem)) {
        return {
          data: nutritionItem,
          cardInfo: {
            key: nutritionItem.id,
            title: nutritionItem.title,
            subtitle: nutritionItem.readingTime
              ? `${nutritionItem.readingTime} ${formatMessage('min')}`
              : undefined,
            image: nutritionItem.headerPicture?.url
          }
        };
      }

      const subtitleArr = [];
      if (nutritionItem.kcal) subtitleArr.push(`${nutritionItem.kcal} ${formatMessage('kcal')}`);
      if (nutritionItem.prepTime) subtitleArr.push(nutritionItem.prepTime);

      return {
        data: nutritionItem,
        cardInfo: {
          key: nutritionItem.id,
          title: nutritionItem.name,
          subtitle: subtitleArr.join(' | '),
          image: nutritionItem.picture?.url
        }
      };
    });
  },
  transformLifestyle: (
    lifestyleArticles: IArticleSearchResponse[]
  ): IFullSearchContent['lifestyle'] => {
    return lifestyleArticles.map((lifestyle) => {
      return {
        data: lifestyle,
        cardInfo: {
          key: lifestyle.id,
          title: lifestyle.title,
          subtitle: lifestyle.readingTime
            ? `${lifestyle.readingTime} ${formatMessage('min')}`
            : undefined,
          image: lifestyle.headerPicture?.url
        }
      };
    });
  },
  transformSearchResults: (results: IFullSearchResponse): IFullSearchContent => {
    const nutritionList: IArticleSearchResponse[] = [];
    const lifeStyleList: IArticleSearchResponse[] = [];
    results.articles.forEach((article) => {
      article.category.forEach((category) => {
        const typeCategory = category as IArticleCategory;
        if (typeCategory.name === 'Lifestyle') {
          lifeStyleList.push(article);
        }
        if (typeCategory.name === 'Nutrition') {
          nutritionList.push(article);
        }
      });
    });

    return {
      workouts: FullSearchAdapter.transformWorkouts(results.workouts),
      programs: FullSearchAdapter.transformPrograms(results.programs),
      nutrition: FullSearchAdapter.transformNutrition(
        [...nutritionList, ...results.recipes].sort((a, b) => (a.id > b.id ? 1 : -1))
      ),
      lifestyle: FullSearchAdapter.transformLifestyle(lifeStyleList)
    };
  }
};

export default FullSearchAdapter;

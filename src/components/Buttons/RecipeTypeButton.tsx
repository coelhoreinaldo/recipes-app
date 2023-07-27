import all from '../../images/allRecipes.svg';
import allDrinks from '../../images/Drinks/allIcon.svg';
import allMeals from '../../images/Meals/allIcon.svg';

type Props = {
  filterType: string,
  filterName?: string,
  handleFilterClick: (filterType: string) => void,
  activeFilter: string,
  testId?: string,
};

interface IconMap {
  [key: string]: string;
}

export default function RecipeTypeButton({
  filterType, filterName = filterType, handleFilterClick, activeFilter, testId = '',
}: Props) {
  const icons:IconMap = {
    All: all,
    Meals: allMeals,
    Drinks: allDrinks,
  };

  const isActive = activeFilter === filterType;
  return (
    <div className="flex flex-col items-center relative mb-8">
      <button
        className={ `rounded-full h-10 w-10 flex 
        items-center justify-center text-sm px-2 border-2
      ${isActive ? 'border-primary' : 'border-secondary'}` }
        type="button"
        data-testid={ testId }
        onClick={ () => handleFilterClick(filterType) }
      >
        <img src={ icons[filterName] } alt={ filterName } />
      </button>
      <span
        className={ `h-10 text-xs absolute
      text-center -bottom-10 ${isActive ? 'text-primary' : 'text-slate-500'}` }
      >
        {filterName}
      </span>
    </div>
  );
}

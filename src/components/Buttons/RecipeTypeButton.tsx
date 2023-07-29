import all from '../../assets/allRecipes.svg';
import allDrinks from '../../assets/Drinks/allIcon.svg';
import allMeals from '../../assets/Meals/allIcon.svg';

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
    <div className="flex flex-col items-center relative mb-8 group">
      <button
        className={ `transition rounded-full h-10 w-10 flex group-hover:border-primary 
        items-center justify-center text-sm px-2 border-2 md:h-16 md:w-16
      ${isActive ? 'border-primary' : 'border-secondary'}` }
        type="button"
        data-testid={ testId }
        onClick={ () => handleFilterClick(filterType) }
      >
        <img src={ icons[filterName] } alt={ filterName } />
      </button>
      <span
        className={ `h-10 text-xs absolute group-hover:text-primary
      text-center -bottom-10 ${isActive ? 'text-primary' : 'text-slate-500'}` }
      >
        {filterName}
      </span>
    </div>
  );
}

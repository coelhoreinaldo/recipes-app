type Props = {
  filterType: string,
  filterName?: string,
  handleFilterClick: (filterType: string) => void,
  activeFilter: string,
  testId?: string,
};

export default function RecipeTypeButton({
  filterType, filterName = filterType, handleFilterClick, activeFilter, testId = '',
}: Props) {
  return (
    <button
      className={ `rounded-full h-10 w-12  text-sm px-2 
    ${activeFilter === filterType ? 'bg-primary' : 'bg-secondary'}` }
      type="button"
      data-testid={ testId }
      onClick={ () => handleFilterClick(filterType) }
    >
      {filterName}
    </button>
  );
}

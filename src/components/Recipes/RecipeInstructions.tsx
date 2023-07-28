type Props = {
  strInstructions: string;
};

export default function RecipeInstructions({ strInstructions }: Props) {
  return (
    <section className="mx-4 lg:px-96">
      <h3 className="text-lg font-extrabold">Instructions</h3>
      <article
        className="whitespace-pre-wrap flex gap-2 p-2 border-primary border
      overflow-auto h-64"
        data-testid="instructions"
      >
        {strInstructions}
      </article>
    </section>
  );
}

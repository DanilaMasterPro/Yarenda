interface PageTitleProps {
  title: string;
  description?: string;
}

export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      {description && <p className="text-gray-600 max-w-3xl">{description}</p>}
    </div>
  );
}

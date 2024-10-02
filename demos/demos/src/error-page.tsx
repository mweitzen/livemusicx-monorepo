import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  let errorText = "";
  if (error instanceof Error) {
    errorText = error.message;
  }
  if (error instanceof Response) {
    errorText = error.statusText;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorText}</i>
      </p>
    </div>
  );
}

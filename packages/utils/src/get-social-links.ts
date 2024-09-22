export function getSocialLinks(resource: { [key: string]: any }): string[] {
  return Object.keys(resource)
    .filter((key) => key.startsWith("social"))
    .filter((key) => !!resource[key])
    .map((key) => resource[key] as string);
}

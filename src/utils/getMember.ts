interface Response {
  items: [
    {
      value: {
        name: string;
        currentRepresentation: {
          member: {
            value: {
              id: number;
              nameDisplayAs: string;
              thumbnailUrl: string;
            };
          };
        };
      };
    }
  ];
}

export default async function getMember(postcode: string) {
  const endpoint = new URL(
    "https://members-api.parliament.uk/api/Location/Constituency/Search"
  );
  endpoint.searchParams.append("searchText", postcode);

  const {
    name: constituency,
    currentRepresentation: {
      member: {
        value: { id, nameDisplayAs: name, thumbnailUrl },
      },
    },
  } = await fetch(endpoint)
    .then((res) => res.json())
    .then((body: Response) => body.items[0].value);

  return { name, constituency, id, thumbnailUrl };
}

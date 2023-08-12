export const mockThumbnailUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Official_portrait_of_Mike_Gapes_crop_2.jpg/900px-Official_portrait_of_Mike_Gapes_crop_2.jpg";

export const mockMemberResponse = {
  items: [
    {
      value: {
        name: "Ilford South",
        currentRepresentation: {
          member: {
            value: {
              id: "id",
              nameDisplayAs: "Mike Gapes",
              thumbnailUrl: mockThumbnailUrl,
            },
          },
        },
      },
    },
  ],
};

export const mockLandlordInterestsResponse = {
  value: [
    {
      name: "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year",
      interests: [
        { interest: "General property interest: (i)" },
        { interest: "Landlord interest: (ii)" },
        { interest: "Combined interest: (i) and (ii)" },
      ],
    },
  ],
};

export const mockNonLandlordInterestsResponse = {
  value: [
    {
      name: "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year",
      interests: [{ interest: "General property interest: (i)" }],
    },
  ],
};

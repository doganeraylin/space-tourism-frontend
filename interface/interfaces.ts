export interface IDestination {
  id: number;
  attributes: {
    name: string;
    description: string;
    distance: number;
    travelTime: number;
    distanceUnit: string;
    durationUnit: string;
    image: Img;
  };
}

export interface Img {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface ICrew {
    id: number,
    attributes: {
        role: string;
        fullName: string;
        bio: string;
        image: Img;
    }
}

export interface ITech {
    id: number;
    attributes: {
        term: "string";
        description: "string"
        image: Img
    }
}
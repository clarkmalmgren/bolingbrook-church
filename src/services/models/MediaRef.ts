
export type MediaRef = {
  id: string;
  name: string;
  description?: string;
  url: string;
  fullPath: string;
  video?: boolean;
}

export type MediaRefMap = { [ key: string ]: MediaRef }

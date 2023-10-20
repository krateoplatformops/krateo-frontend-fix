export type LoginFormType = {
  email: string;
  password: string;
};

export type LoginRequestType = {
  username: string;
  password: string;
};

export type AuthResponseType = {
  code: number;
  user: {
    displayName: string;
    username: string;
    avatarURL: string;
  } | null,
  data: {
    apiVersion: string;
    clusters: {
      cluster: {
        "certificate-authority-data": string;
        server: string;
      },
      name: string;
    }[],
    contexts: {
      context: {
        cluster: string;
        user: string;
      },
      name: string;
    }[],
    "current-context": string;
    kind: string;
    users: {
      user: {
        "client-certificate-data": string;
        "client-key-data": string;
      },
      name: string;
    }[]
  } | null
}

export type AuthModesType = {
  authModes: {
    type: string;
    url: string;
  }[];
}
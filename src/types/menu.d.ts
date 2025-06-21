declare namespace App {
  interface IMenuItem {
    name: string;
    path: string;
    icon?: string;
    url: string;
    children?: IMenuItem[];
    meta?: {
      requiresAuth?: boolean;
      permission?: string;
    };
  }
}

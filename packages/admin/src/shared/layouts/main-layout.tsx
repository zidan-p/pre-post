import { ReactNode } from "react";
import { Layout } from "react-admin";
import { MainMenu } from "./main-menu";

interface MainLayoutProps{
  children?: ReactNode
}

export const MainLayout = (props: MainLayoutProps) => <Layout {...props} menu={MainMenu}/>
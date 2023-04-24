import { ColorModeProvider } from "@/context/ColorModeContext";
import { FaHome } from "react-icons/fa";
import SidebarButton from "../SidebarButton";

// const AuthProviderMock = ({ options, children }) => {
//     const darkMode = options.mode
//     return <ColorModeProvider>{children}</ColorModeProvider>;
//  };

//  const AuthDecorator = (Story, { parameters: { options }}) => (
//     <AuthProviderMock authOptions={authOptions}>
//        <Story />
//     </AuthProviderMock>
//  );

const ColorModeDecorator = (Story) => (
  <ColorModeProvider>
    <Story />
  </ColorModeProvider>
);

const meta = {
  title: "Layout/SidebarButton",
  component: SidebarButton,
  decorators: [ColorModeDecorator],
};

export default meta;

export const DefaultSidebarButton = {
  args: {
    link: {
      text: "Home",
      icon: <FaHome size="1.3rem" className="text-brand" />,
      path: "/",
    },
  },
};

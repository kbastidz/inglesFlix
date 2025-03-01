import { NavBarProps } from "./Navbar.type";
import { NavBarDesktop } from "./NavBarDesktop";
import { NavBarMobile } from "./NavBarMobile";

export function Navbar(props: NavBarProps) {
  const { users } = props;

  return (
    <nav>
      <div className="hidden mx-auto md:block">
        <NavBarDesktop users={users} />
      </div>
      <div className="md:hidden">
        <NavBarMobile users={users} />
      </div>
    </nav>
  );
}
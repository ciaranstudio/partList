import { useFetcher } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function AuthStatus() {
  // Get our logged in user, if they exist, from the logged in auth user
  // const [email, setEmail] = useState(authProvider.user.email);
  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;

  // useEffect(() => {
  //   if (!isLoggingOut) {
  //     setEmail("");
  //   }
  // }, [isLoggingOut]);

  return (
    <div>
      <fetcher.Form method="post" action="/logout">
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          type="submit"
          disabled={isLoggingOut}
        >
          <ListItemIcon>
            <LogoutIcon />
            {/* <AuthStatus id="logged-in-user" /> */}
          </ListItemIcon>
          <ListItemText
            primary={isLoggingOut ? "Signing out..." : "Sign out"}
          />
        </ListItemButton>
      </fetcher.Form>
    </div>
  );
}

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
      {/* (for AppBar horizontal) */}
      {/* <fetcher.Form method="post" action="/logout">
        <IconButton component="button" type="submit" disabled={isLoggingOut}>
          <LogoutIcon sx={{ color: isLoggingOut ? "#cccccc" : "#eeeeee" }} />
        </IconButton>
      </fetcher.Form> */}
      <fetcher.Form method="post" action="/logout">
        {/* <span id="logged-in-user">{email}</span> */}
        {/* <span id="logged-in-user">{uid}</span> */}
        {/* <button id="logout-button" type="submit" disabled={isLoggingOut}> */}
        {/* <button id="logout-button" type="submit"> */}
        {/* {isLoggingOut ? "Signing out..." : "Sign out"} */}
        {/* Sign out */}
        {/* </button> */}

        <ListItemButton
          // selected={selectedIndex === 2}
          // onClick={(event) => handleListItemClick(event, 2)}
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
          {/* <button type="submit">New</button> */}
        </ListItemButton>
      </fetcher.Form>
    </div>
  );
}

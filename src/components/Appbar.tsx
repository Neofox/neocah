import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../store/system/actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Appbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.firebase.auth);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        setAnchorEl(null);
        dispatch(signOut())
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton component={Link} to={"/"} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Cards Against Humanity (Beta)
                    </Typography>
                    {auth.uid ? (
                        <div>
                            <IconButton aria-haspopup="true" onClick={handleMenu} color="inherit">
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={"/favorites"} onClick={handleClose}>Favorites</MenuItem>
                                <MenuItem component={Link} to={"/sign-in"} onClick={handleSignOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button component={Link} to={"/sign-in"} color="inherit">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};


export default Appbar;

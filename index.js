import SignIn from "./views/signInView";

const router = async () => {
    const routes = [
        { path: "/", view: Home, minRole: roles.guest },
        { path: "/sign-up", view: SignUp, minRole: roles.guest },
        { path: "/sign-in", view: SignIn, minRole: roles.guest },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });


    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    if (!match) {
        Utils.showError(404)
        return
    }

    const user = Utils.getUser()
    if (!user.role) {
        user.role = roles.guest
        localStorage.setItem('role', user.role)
    }

    const navBarView = new NavBar(null, user);
    document.querySelector("#navbar").innerHTML = await navBarView.getHtml();
    navBarView.init()

    if (user.role < match.route.minRole) {
        Utils.showError(401, "Please sign in to access this page")
        return
    }

    const pageView = new match.route.view(getParams(match), user);
    document.querySelector("#app").innerHTML = await pageView.getHtml();
    pageView.init()
};

window.addEventListener("popstate", router);



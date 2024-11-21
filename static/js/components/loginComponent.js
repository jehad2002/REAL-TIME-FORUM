// Fonction pour créer l'élément de formulaire de login
export function createLoginElement() {
    // Créez un élément div pour représenter le formulaire de login
    const loginElement = document.createElement("div");
    loginElement.classList.add("container", "main-container-pop");

    // Ajoutez le contenu du formulaire de login à l'élément div
    loginElement.innerHTML = `
        <div class="login-box">
            <div class="header">
                <h2>Login Page</h2>
            </div>
            <div class="login">
                <form  id="loginForm">
                    <div class="form-control1">
                        <input type="text"  placeholder="UserName" class="tbox" id="loginUsername" required />
                    </div>
                    <div class="form-control1">
                        <input type="password" placeholder="Password" class="tbox" title="Seuls les lettres majuscules, les lettres minuscules, les chiffres et les caractères spéciaux sont autorisés" id="loginPassword" required />
                    </div>
                    <div id="login-error" style="display: none; color: red;">
                        Mot de passe ou username incorrect
                    </div>
                    <div class="form-control1">
                        <input type="submit" value="Login Now" class="btn" />
                    </div>
                </form>

                <div class="forget-box">
                    <a class="link">Forgot password</a>
                </div>
                <div class="form-control1">
                    <p>Don't have an account? <a  id="open-popup-signup-link">Sign up</a></p>
                </div>

            </div>
        </div>
    `;

    return loginElement;
}
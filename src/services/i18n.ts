import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          landingPage: {
            login: "Login",
            signup: "Signup",
            tagline: "Supercharge your online presence with",
            heroText:
              "Unlock the power of influencers across diverse audiences. Elevate your social media game!",
            signupMailingList: "Your email address.",
            highlights: "What we bring to the table",
            analytics: "Advanced Analytics to Boost Your ROI",
            audit: "In-House Valuation Tools",
            performance: "Campaign Performance Tracker",
            marketingFuture: "Gain free access to the future of social media",
            rights: "All Rights Reserved.",
            copyright: "Copyright",
          },
          authPage: {
            email: "Email",
            password: "Password",
            firstName: "First Name",
            lastName: "Last Name",
            confirmPassword: "Confirm Password",
            acceptTOC: "Accept Terms & Conditions",
            welcome: "Welcome Back",
            forgot: "Forgot Password?",
            oldAccount: "Already have an account?",
            newAccount: "Don't have an account?",
            createAccount: "Create New Account",
            registerAccount: "Register Account",
          },
          homePage: {
            searchUser: "Search Users",
            searchProfile: "Search Profiles",
          },
          posts: {
            createPost: "Speak your mind.",
            createTags: "Add 🔖tags and press enter",
            post: "Post",
            update: "Update",
            drag: "Drag & Drop",
            select: "Select",
            upload: "to upload",
            image: "image",
            files: "files",
            or: "or",
            deletePost: "Are you sure you want to delete the post❓",
          },
          comments: {
            createComment: "Enter a comment",
            deleteComment: "Are you sure you want to delete the comment❓",
          },
          chatPage: {
            startChat: "Start the chat.",
            createGroup: "Create Group",
            members: "Members",
            leaveChat: "Are you sure you want to leave the chat❓",
            deleteChat: "Are you sure you want to delete the chat❓",
            enterMessage: "Enter your message.",
            updateGroupName: "Update Name",
          },
          userPages: {
            home: "Home",
            about: "About",
            posts: "Posts",
            bookmarks: "Bookmarks",
            settings: "Settings",
            logout: "Logout",
            follow: "Follow",
            unfollow: "Unfollow",
            followers: "Followers",
            following: "Following",
            notProvided: "Not provided",
            no: "NO",
            yes: "Yes",
            logoutUser: "Are you sure you want to logout❓",
            bio: "Bio",
            enterBio: "Enter your Bio",
            location: "Location",
            dob: "Date of birth",
            phoneNumber: "Phone Number",
            save: "Save",
            returnHome: "Return Home",
          },
          options: {
            addUser: "Add User",
            info: "Info",
            edit: "Edit",
            leave: "Leave",
            delete: "Delete",
          },
          notification: {
            error: "Error",
            info: "Info",
            warning: "Warning",
            success: "Success",
            caution: "Caution",
          },
          notificationMessages: {
            updateProfile: "Please update your profile.",
            verifyEmail: "Please verify your email address.",
            signupUser: "User profile created successfully. Please Login.",
            addMember: "Chat member added successfully.",
            createChat: "Chat created successfully.",
            deleteChat: "User chat deleted successfully.",
            updateGroupName: "Group chat name updated successfully.",
            deleteComment: "Comment deleted successfully.",
            updateComment: "Comment updated successfully.",
            createComment: "Comment created successfully.",
            likeComment: "Comment liked successfully.",
            updatePost: "Post updated successfully.",
            createPost: "Post created successfully.",
            deletePost: "Post deleted successfully.",
            bookmarkPost: "Post bookmarked successfully.",
            likePost: "Post liked successfully.",
            uploadImage: "images only allowed to be uploaded.",
            limitedTags: "tags are only allowed per post.",
            updatedProfile: "User profile updated successfully.",
            createdProfile: "User profile created successfully.",
            updateCoverImage: "Cover image updated successfully.",
            updateProfileImage: "Profile image updated successfully.",
            followUser: "User followed sucessfully.",
            unfollowUser: "User unfollowed successfully",
          },
          validationMessages: {
            firstName: "Firstname should be at least 3 characters",
            maxFirstName: "Firstname should be at most 255 characters",
            lastName: "Lastname should be at least 3 characters",
            maxLastName: "Lastname should be at most 255 characters",
            validEmail: "Must be a valid email",
            minPassword: "Password must be at least 8 characters long",
            maxPassword: "Password must be at most 30 characters long",
            passwordRequirement:
              "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
            confPassReq: "Confirm Password is required",
            acceptTOC: "You must accept Terms and Conditions",
            matchPassword: "Password don't match",
            requirePassword: "Password is required",
            bio: "Bio should be at least 10 characters",
            maxBio: "Bio should be at most 255 characters",
            chatMessage: "Message should be at least 1 character.",
            postContent: "Post Content should be at least 3 characters.",
            commentContent: "Comment should be at least 3 characters.",
          },
        },
      },
      de: {
        translation: {
          landingPage: {
            login: "Anmelden",
            signup: "Registrieren",
            tagline: "Optimiere deine Online-Präsenz mit",
            heroText:
              "Entfessle die Kraft von Influencern in verschiedenen Zielgruppen. Verbessere dein Social-Media-Spiel!",
            signupMailingList: "Deine E-Mail-Adresse.",
            highlights: "Was wir bieten",
            analytics: "Erweiterte Analytik zur Steigerung deines ROI",
            audit: "Interne Bewertungswerkzeuge",
            performance: "Kampagnenleistungstracker",
            marketingFuture:
              "Kostenloser Zugang zur Zukunft der sozialen Medien",
            rights: "Alle Rechte vorbehalten.",
            copyright: "Urheberrecht",
          },
          authPage: {
            email: "E-Mail",
            password: "Passwort",
            firstName: "Vorname",
            lastName: "Nachname",
            confirmPassword: "Passwort bestätigen",
            acceptTOC: "AGBs akzeptieren",
            welcome: "Willkommen zurück",
            forgot: "Passwort vergessen?",
            oldAccount: "Bereits ein Konto vorhanden?",
            newAccount: "Noch kein Konto?",
            createAccount: "Neues Konto erstellen",
            registerAccount: "Konto registrieren",
          },
          homePage: {
            searchUser: "Benutzer suchen",
            searchProfile: "Profile suchen",
          },
          posts: {
            createPost: "Äußere deine Meinung.",
            createTags: "Füge 🔖Tags hinzu und drücke Enter",
            post: "Posten",
            update: "Aktualisieren",
            drag: "Ziehen & Ablegen",
            select: "Auswählen",
            upload: "zum Hochladen",
            image: "Bild",
            files: "Dateien",
            or: "oder",
            deletePost:
              "Bist du sicher, dass du den Beitrag löschen möchtest❓",
          },
          comments: {
            createComment: "Kommentar eingeben",
            deleteComment:
              "Bist du sicher, dass du den Kommentar löschen möchtest❓",
          },
          chatPage: {
            startChat: "Chat starten.",
            createGroup: "Gruppe erstellen",
            members: "Mitglieder",
            leaveChat: "Bist du sicher, dass du den Chat verlassen möchtest❓",
            deleteChat: "Bist du sicher, dass du den Chat löschen möchtest❓",
            enterMessage: "Gib deine Nachricht ein.",
            updateGroupName: "Name aktualisieren",
          },
          userPages: {
            home: "Startseite",
            about: "Über uns",
            posts: "Beiträge",
            bookmarks: "Lesezeichen",
            settings: "Einstellungen",
            logout: "Abmelden",
            follow: "Folgen",
            unfollow: "Nicht mehr folgen",
            followers: "Follower",
            following: "Folge ich",
            notProvided: "Nicht angegeben",
            no: "NEIN",
            yes: "JA",
            logoutUser: "Bist du sicher, dass du dich abmelden möchtest❓",
            bio: "Biografie",
            enterBio: "Gib deine Biografie ein",
            location: "Ort",
            dob: "Geburtsdatum",
            phoneNumber: "Telefonnummer",
            save: "Speichern",
            returnHome: "Zurück zur Startseite",
          },
          options: {
            addUser: "Benutzer hinzufügen",
            info: "Info",
            edit: "Bearbeiten",
            leave: "Verlassen",
            delete: "Löschen",
          },
          notification: {
            error: "Fehler",
            info: "Info",
            warning: "Warnung",
            success: "Erfolg",
            caution: "Vorsicht",
          },
          notificationMessages: {
            updateProfile: "Bitte aktualisiere dein Profil.",
            verifyEmail: "Bitte bestätige deine E-Mail-Adresse.",
            signupUser: "Benutzerprofil erfolgreich erstellt. Bitte einloggen.",
            addMember: "Chat-Mitglied erfolgreich hinzugefügt.",
            createChat: "Chat erfolgreich erstellt.",
            deleteChat: "Benutzer-Chat erfolgreich gelöscht.",
            updateGroupName: "Gruppenchat-Namen erfolgreich aktualisiert.",
            deleteComment: "Kommentar erfolgreich gelöscht.",
            updateComment: "Kommentar erfolgreich aktualisiert.",
            createComment: "Kommentar erfolgreich erstellt.",
            likeComment: "Kommentar erfolgreich geliked.",
            updatePost: "Beitrag erfolgreich aktualisiert.",
            createPost: "Beitrag erfolgreich erstellt.",
            deletePost: "Beitrag erfolgreich gelöscht.",
            bookmarkPost: "Beitrag erfolgreich als Lesezeichen gespeichert.",
            likePost: "Beitrag erfolgreich geliked.",
            uploadImage: "Nur Bilder sind zum Hochladen erlaubt.",
            limitedTags: "Tags sind pro Beitrag begrenzt.",
            updatedProfile: "Benutzerprofil erfolgreich aktualisiert.",
            createdProfile: "Benutzerprofil erfolgreich erstellt.",
            updateCoverImage: "Titelbild erfolgreich aktualisiert.",
            updateProfileImage: "Profilbild erfolgreich aktualisiert.",
            followUser: "Benutzer erfolgreich gefolgt.",
            unfollowUser: "Benutzer erfolgreich nicht mehr gefolgt",
          },
          validationMessages: {
            firstName: "Der Vorname muss mindestens 3 Zeichen lang sein",
            maxFirstName: "Der Vorname darf höchstens 255 Zeichen lang sein",
            lastName: "Der Nachname muss mindestens 3 Zeichen lang sein",
            maxLastName: "Der Nachname darf höchstens 255 Zeichen lang sein",
            validEmail: "Es muss eine gültige E-Mail-Adresse sein",
            minPassword: "Das Passwort muss mindestens 8 Zeichen lang sein",
            maxPassword: "Das Passwort darf höchstens 30 Zeichen lang sein",
            passwordRequirement:
              "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten",
            confPassReq: "Die Bestätigung des Passworts ist erforderlich",
            acceptTOC: "Sie müssen die Geschäftsbedingungen akzeptieren",
            matchPassword: "Die Passwörter stimmen nicht überein",
            requirePassword: "Das Passwort ist erforderlich",
            bio: "Die Biografie muss mindestens 10 Zeichen lang sein",
            maxBio: "Die Biografie darf höchstens 255 Zeichen lang sein",
            chatMessage: "Die Nachricht muss mindestens 1 Zeichen lang sein.",
            postContent:
              "Der Inhalt des Beitrags muss mindestens 3 Zeichen lang sein.",
            commentContent:
              "Der Kommentar muss mindestens 3 Zeichen lang sein.",
          },
        },
      },
      es: {
        translation: {
          landingPage: {
            login: "Iniciar sesión",
            signup: "Registrarse",
            tagline: "Potencia tu presencia en línea con",
            heroText:
              "Desbloquea el poder de los influencers en diversas audiencias. ¡Eleva tu juego en redes sociales!",
            signupMailingList: "Tu dirección de correo electrónico.",
            highlights: "Lo que aportamos",
            analytics:
              "Análisis avanzado para impulsar tu retorno de inversión",
            audit: "Herramientas de valoración internas",
            performance: "Seguimiento del rendimiento de campañas",
            marketingFuture:
              "Obtén acceso gratuito al futuro de las redes sociales",
            rights: "Todos los derechos reservados.",
            copyright: "Derechos de autor",
          },
          authPage: {
            email: "Correo electrónico",
            password: "Contraseña",
            firstName: "Nombre",
            lastName: "Apellido",
            confirmPassword: "Confirmar contraseña",
            acceptTOC: "Aceptar términos y condiciones",
            welcome: "Bienvenido de nuevo",
            forgot: "¿Olvidaste tu contraseña?",
            oldAccount: "¿Ya tienes una cuenta?",
            newAccount: "¿No tienes una cuenta?",
            createAccount: "Crear nueva cuenta",
            registerAccount: "Registrar cuenta",
          },
          homePage: {
            searchUser: "Buscar usuarios",
            searchProfile: "Buscar perfiles",
          },
          posts: {
            createPost: "Expresa tus pensamientos.",
            createTags: "Añade 🔖etiquetas y presiona enter",
            post: "Publicar",
            update: "Actualizar",
            drag: "Arrastra y suelta",
            select: "Seleccionar",
            upload: "para subir",
            image: "imagen",
            files: "archivos",
            or: "o",
            deletePost:
              "¿Estás seguro de que quieres eliminar la publicación❓",
          },
          comments: {
            createComment: "Ingresa un comentario",
            deleteComment:
              "¿Estás seguro de que quieres eliminar el comentario❓",
          },
          chatPage: {
            startChat: "Iniciar el chat.",
            createGroup: "Crear grupo",
            members: "Miembros",
            leaveChat: "¿Estás seguro de que quieres abandonar el chat❓",
            deleteChat: "¿Estás seguro de que quieres eliminar el chat❓",
            enterMessage: "Ingresa tu mensaje.",
            updateGroupName: "Actualizar nombre",
          },
          userPages: {
            home: "Inicio",
            about: "Acerca de",
            posts: "Publicaciones",
            bookmarks: "Marcadores",
            settings: "Configuración",
            logout: "Cerrar sesión",
            follow: "Seguir",
            unfollow: "Dejar de seguir",
            followers: "Seguidores",
            following: "Siguiendo",
            notProvided: "No proporcionado",
            no: "NO",
            yes: "Sí",
            logoutUser: "¿Estás seguro de que quieres cerrar sesión❓",
            bio: "Biografía",
            enterBio: "Ingresa tu biografía",
            location: "Ubicación",
            dob: "Fecha de nacimiento",
            phoneNumber: "Número de teléfono",
            save: "Guardar",
            returnHome: "Volver a la página de inicio",
          },
          options: {
            addUser: "Agregar usuario",
            info: "Información",
            edit: "Editar",
            leave: "Salir",
            delete: "Eliminar",
          },
          notification: {
            error: "Error",
            info: "Información",
            warning: "Advertencia",
            success: "Éxito",
            caution: "Precaución",
          },
          notificationMessages: {
            updateProfile: "Por favor, actualiza tu perfil.",
            verifyEmail:
              "Por favor, verifica tu dirección de correo electrónico.",
            signupUser:
              "Perfil de usuario creado con éxito. Por favor, inicia sesión.",
            addMember: "Miembro del chat agregado con éxito.",
            createChat: "Chat creado con éxito.",
            deleteChat: "Chat de usuario eliminado con éxito.",
            updateGroupName: "Nombre del chat grupal actualizado con éxito.",
            deleteComment: "Comentario eliminado con éxito.",
            updateComment: "Comentario actualizado con éxito.",
            createComment: "Comentario creado con éxito.",
            likeComment: "Comentario marcado como me gusta con éxito.",
            updatePost: "Publicación actualizada con éxito.",
            createPost: "Publicación creada con éxito.",
            deletePost: "Publicación eliminada con éxito.",
            bookmarkPost: "Publicación marcada como favorita con éxito.",
            likePost: "Publicación marcada como me gusta con éxito.",
            uploadImage: "Solo se permiten imágenes para cargar.",
            limitedTags: "etiquetas permitidas por publicación.",
            updatedProfile: "Perfil de usuario actualizado con éxito.",
            createdProfile: "Perfil de usuario creado con éxito.",
            updateCoverImage: "Imagen de portada actualizada con éxito.",
            updateProfileImage: "Imagen de perfil actualizada con éxito.",
            followUser: "Usuario seguido con éxito.",
            unfollowUser: "Usuario dejado de seguir con éxito",
          },
          validationMessages: {
            firstName: "El nombre debe tener al menos 3 caracteres",
            maxFirstName: "El nombre debe tener como máximo 255 caracteres",
            lastName: "El apellido debe tener al menos 3 caracteres",
            maxLastName: "El apellido debe tener como máximo 255 caracteres",
            validEmail: "Debe ser un correo electrónico válido",
            minPassword: "La contraseña debe tener al menos 8 caracteres",
            maxPassword: "La contraseña debe tener como máximo 30 caracteres",
            passwordRequirement:
              "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un dígito",
            confPassReq: "Se requiere confirmar la contraseña",
            acceptTOC: "Debes aceptar los términos y condiciones",
            matchPassword: "Las contraseñas no coinciden",
            requirePassword: "Se requiere contraseña",
            bio: "La biografía debe tener al menos 10 caracteres",
            maxBio: "La biografía debe tener como máximo 255 caracteres",
            chatMessage: "El mensaje debe tener al menos 1 caracter.",
            postContent:
              "El contenido de la publicación debe tener al menos 3 caracteres.",
            commentContent: "El comentario debe tener al menos 3 caracteres.",
          },
        },
      },
      hi: {
        translation: {
          landingPage: {
            login: "लॉगिन",
            signup: "साइन अप",
            tagline: "अपनी ऑनलाइन मौजूदगी को सुधारें",
            heroText:
              "विभिन्न दर्शकों के बीच इनफ्लुएंसर्स की शक्ति को खोलें। अपने सोशल मीडिया गेम को उच्च करें!",
            signupMailingList: "आपका ईमेल पता।",
            highlights: "हम क्या लेकर आएंगे",
            analytics: "आपके ROI को बढ़ाने के लिए उन्नत विश्लेषण",
            audit: "इन-हाउस मूल्यांकन टूल्स",
            performance: "कैम्पेन प्रदर्शन ट्रैकर",
            marketingFuture: "सोशल मीडिया के भविष्य का मुफ्त उपयोग करें",
            rights: "सभी अधिकार सुरक्षित हैं।",
            copyright: "कॉपीराइट",
          },
          authPage: {
            email: "ईमेल",
            password: "पासवर्ड",
            firstName: "पहला नाम",
            lastName: "अंतिम नाम",
            confirmPassword: "पासवर्ड पुनः पुष्टि करें",
            acceptTOC: "नियम और शर्तें स्वीकार करें",
            welcome: "वापस स्वागत है",
            forgot: "पासवर्ड भूल गए?",
            oldAccount: "पहले से ही एक खाता है?",
            newAccount: "खाता नहीं है?",
            createAccount: "नया खाता बनाएं",
            registerAccount: "खाता पंजीकृत करें",
          },
          homePage: {
            searchUser: "उपयोगकर्ता खोजें",
            searchProfile: "प्रोफाइल खोजें",
          },
          posts: {
            createPost: "अपने विचार कहें।",
            createTags: "🔖 टैग जोड़ें और एंटर दबाएं",
            post: "पोस्ट",
            update: "अपडेट",
            drag: "ड्रैग एंड ड्रॉप",
            select: "चयन करें",
            upload: "अपलोड करने के लिए",
            image: "तस्वीर",
            files: "फ़ाइलें",
            or: "या",
            deletePost: "क्या आप पोस्ट को हटाना चाहते हैं❓",
          },
          comments: {
            createComment: "एक टिप्पणी दर्ज करें",
            deleteComment: "क्या आप टिप्पणी को हटाना चाहते हैं❓",
          },
          chatPage: {
            startChat: "चैट शुरू करें।",
            createGroup: "समूह बनाएं",
            members: "सदस्य",
            leaveChat: "क्या आप चैट छोड़ना चाहते हैं❓",
            deleteChat: "क्या आप चैट को हटाना चाहते हैं❓",
            enterMessage: "अपना संदेश दर्ज करें।",
            updateGroupName: "नाम अपडेट करें",
          },
          userPages: {
            home: "होम",
            about: "के बारे में",
            posts: "पोस्ट्स",
            bookmarks: "बुकमार्क्स",
            settings: "सेटिंग्स",
            logout: "लॉग आउट",
            follow: "फॉलो करें",
            unfollow: "अनफॉलो करें",
            followers: "फॉलोअर्स",
            following: "फॉलो कर रहे हैं",
            notProvided: "प्रदान नहीं किया गया है",
            no: "नहीं",
            yes: "हाँ",
            logoutUser: "क्या आप वाकई लॉगआउट करना चाहते हैं❓",
            bio: "बायो",
            enterBio: "अपना बायो दर्ज करें",
            location: "स्थान",
            dob: "जन्मतिथि",
            phoneNumber: "फ़ोन नंबर",
            save: "सहेजें",
            returnHome: "होम पर वापस जाएं",
          },
          options: {
            addUser: "उपयोगकर्ता जोड़ें",
            info: "जानकारी",
            edit: "संपादित करें",
            leave: "छोड़ें",
            delete: "हटाएं",
          },
          notification: {
            error: "त्रुटि",
            info: "जानकारी",
            warning: "चेतावनी",
            success: "सफलता",
            caution: "सावधानी",
          },
          notificationMessages: {
            updateProfile: "कृपया अपना प्रोफ़ाइल अपडेट करें।",
            verifyEmail: "कृपया अपना ईमेल पता सत्यापित करें।",
            signupUser:
              "उपयोगकर्ता प्रोफ़ाइल सफलतापूर्वक बनाई गई है। कृपया लॉगिन करें।",
            addMember: "चैट सदस्य सफलतापूर्वक जोड़ा गया है।",
            createChat: "चैट सफलतापूर्वक बनाई गई है।",
            deleteChat: "उपयोगकर्ता चैट सफलतापूर्वक हटा दी गई है।",
            updateGroupName: "समूह चैट का नाम सफलतापूर्वक अपडेट किया गया है।",
            deleteComment: "टिप्पणी सफलतापूर्वक हटा दी गई है।",
            updateComment: "टिप्पणी सफलतापूर्वक अपडेट की गई है।",
            createComment: "टिप्पणी सफलतापूर्वक बनाई गई है।",
            likeComment: "टिप्पणी को सफलतापूर्वक पसंद किया गया है।",
            updatePost: "पोस्ट सफलतापूर्वक अपडेट की गई है।",
            createPost: "पोस्ट सफलतापूर्वक बनाई गई है।",
            deletePost: "पोस्ट सफलतापूर्वक हटा दी गई है।",
            bookmarkPost: "पोस्ट को सफलतापूर्वक बुकमार्क किया गया है।",
            likePost: "पोस्ट को सफलतापूर्वक पसंद किया गया है।",
            uploadImage: "केवल छवियाँ अपलोड करने की अनुमति हैं।",
            limitedTags: "प्रति पोस्ट केवल टैग्स की अनुमति हैं।",
            updatedProfile: "उपयोगकर्ता प्रोफ़ाइल सफलतापूर्वक अपडेट की गई है।",
            createdProfile: "उपयोगकर्ता प्रोफ़ाइल सफलतापूर्वक बनाई गई है।",
            updateCoverImage: "कवर छवि सफलतापूर्वक अपडेट की गई है।",
            updateProfileImage: "प्रोफ़ाइल छवि सफलतापूर्वक अपडेट की गई है।",
            followUser: "उपयोगकर्ता को सफलतापूर्वक फॉलो किया गया है।",
            unfollowUser: "उपयोगकर्ता को सफलतापूर्वक अनफॉलो किया गया है।",
          },
          validationMessages: {
            firstName: "पहला नाम कम से कम 3 अक्षरों का होना चाहिए",
            maxFirstName: "पहला नाम अधिकतम 255 अक्षरों का होना चाहिए",
            lastName: "अंतिम नाम कम से कम 3 अक्षरों का होना चाहिए",
            maxLastName: "अंतिम नाम अधिकतम 255 अक्षरों का होना चाहिए",
            validEmail: "एक मान्य ईमेल होना चाहिए",
            minPassword: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए",
            maxPassword: "पासवर्ड अधिकतम 30 अक्षरों का होना चाहिए",
            passwordRequirement:
              "पासवर्ड में कम से कम एक अपरकेस अक्षर, एक लोअरकेस अक्षर और एक अंक होना चाहिए",
            confPassReq: "पासवर्ड की पुष्टि की जरूरत है",
            acceptTOC: "आपको नियम और शर्तें स्वीकार करनी होंगी",
            matchPassword: "पासवर्ड मेल नहीं खाते",
            requirePassword: "पासवर्ड आवश्यक है",
            bio: "बायो कम से कम 10 अक्षरों का होना चाहिए",
            maxBio: "बायो अधिकतम 255 अक्षरों का होना चाहिए",
            chatMessage: "संदेश कम से कम 1 अक्षर होना चाहिए।",
            postContent: "पोस्ट सामग्री कम से कम 3 अक्षरों की होनी चाहिए।",
            commentContent: "टिप्पणी कम से कम 3 अक्षरों की होनी चाहिए।",
          },
        },
      },
      ne: {
        translation: {
          landingPage: {
            login: "लगइन",
            signup: "साइन अप",
            tagline: "आफ्नो अनलाइन उपस्थिति लाइभ गर्नुहोस्",
            heroText:
              "विभिन्न दर्शकहरूमा प्रभावकारी व्यक्तिहरूको शक्ति अनलक गर्नुहोस्। आफ्नो सोशल मिडिया खेल उच्च गर्नुहोस्!",
            signupMailingList: "तपाईंको इमेल ठेगाना।",
            highlights: "हामी कसरी बजारमा ल्याउँछौं",
            analytics: "तपाईंको ROI बढाउनका लागि बुझ्नुहोस्",
            audit: "घरेलु मूल्यांकन उपकरणहरू",
            performance: "क्याम्पेन प्रदर्शन ट्रैकर",
            marketingFuture:
              "सोशल मिडिया को भविष्यमा नि: शुल्क पहुँच प्राप्त गर्नुहोस्",
            rights: "सबै अधिकारहरू सुरक्षित छन्।",
            copyright: "कपिराइट",
          },
          authPage: {
            email: "इमेल",
            password: "पासवर्ड",
            firstName: "पहिलो नाम",
            lastName: "थर",
            confirmPassword: "पासवर्ड पुनः पुष्टि गर्नुहोस्",
            acceptTOC: "सर्त र शर्तहरू स्वीकृत गर्नुहोस्",
            welcome: "स्वागत छ",
            forgot: "पासवर्ड बिर्सनु भयो?",
            oldAccount: "पहिले नै खाता छ?",
            newAccount: "खाता छैन?",
            createAccount: "नयाँ खाता बनाउनुहोस्",
            registerAccount: "खाता पंजीकृत गर्नुहोस्",
          },
          homePage: {
            searchUser: "प्रयोगकर्ता खोज्नुहोस्",
            searchProfile: "प्रोफाइलहरू खोज्नुहोस्",
          },
          posts: {
            createPost: "तपाईंको धारा बोलाउनुहोस्।",
            createTags: "🔖 ट्यागहरू थप्नुहोस् र enter थिच्नुहोस्",
            post: "पोस्ट",
            update: "अपडेट",
            drag: "ड्र्याग गर्नुहोस् र",
            select: "छान्नुहोस्",
            upload: "अपलोड गर्नुहोस्",
            image: "छवि",
            files: "फाइलहरू",
            or: "वा",
            deletePost: "के तपाईं पोस्ट हटाउन चाहानुहुन्छ❓",
          },
          comments: {
            createComment: "टिप्पणी छोड्नुहोस्",
            deleteComment: "के तपाईं टिप्पणी हटाउन चाहनुहुन्छ❓",
          },
          chatPage: {
            startChat: "च्याट सुरु गर्नुहोस्।",
            createGroup: "समूह बनाउनुहोस्",
            members: "सदस्यहरू",
            leaveChat: "के तपाईं च्याट छोड्न चाहनुहुन्छ❓",
            deleteChat: "के तपाईं च्याट हटाउन चाहनुहुन्छ❓",
            enterMessage: "तपाईंको सन्देश लेख्नुहोस्।",
            updateGroupName: "नाम अपडेट गर्नुहोस्",
          },
          userPages: {
            home: "होम",
            about: "बारेमा",
            posts: "पोस्टहरू",
            bookmarks: "बुकमार्कहरू",
            settings: "सेटिङ्ग्स",
            logout: "लगआउट",
            follow: "अनुसरण गर्नुहोस्",
            unfollow: "अनुसरण छोड्नुहोस्",
            followers: "अनुयायीहरू",
            following: "अनुसरण गरिएको",
            notProvided: "प्रदान गरिएको छैन",
            no: "होइन",
            yes: "हो",
            logoutUser: "के तपाईं लगआउट गर्न चाहनुहुन्छ❓",
            bio: "बायो",
            enterBio: "तपाईंको बायो लेख्नुहोस्",
            location: "स्थान",
            dob: "जन्म मिति",
            phoneNumber: "फोन नम्बर",
            save: "सुरक्षित गर्नुहोस्",
            returnHome: "होममा पुनर्लाभ गर्नुहोस्",
          },
          options: {
            addUser: "प्रयोगकर्ता थप्नुहोस्",
            info: "जानकारी",
            edit: "सम्पादन गर्नुहोस्",
            leave: "छोड्नुहोस्",
            delete: "हटाउनुहोस्",
          },
          notification: {
            error: "त्रुटि",
            info: "जानकारी",
            warning: "चेतावनी",
            success: "सफलता",
            caution: "सावधान",
          },
          notificationMessages: {
            updateProfile: "कृपया आफ्नो प्रोफाइल अपडेट गर्नुहोस्।",
            verifyEmail: "कृपया आफ्नो इमेल ठेगाना सत्यापन गर्नुहोस्।",
            signupUser:
              "प्रयोगकर्ता प्रोफाइल सफलतापूर्वक बनाइयो। कृपया लगइन गर्नुहोस्।",
            addMember: "च्याट सदस्यलाई सफलतापूर्वक थपियो।",
            createChat: "च्याट सफलतापूर्वक बनाइयो।",
            deleteChat: "प्रयोगकर्ता च्याटलाई सफलतापूर्वक हटाइयो।",
            updateGroupName: "समूह च्याटको नामलाई सफलतापूर्वक अपडेट गरियो।",
            deleteComment: "टिप्पणीलाई सफलतापूर्वक हटाइयो।",
            updateComment: "टिप्पणीलाई सफलतापूर्वक अपडेट गरियो।",
            createComment: "टिप्पणी सफलतापूर्वक बनाइयो।",
            likeComment: "टिप्पणीलाई सफलतापूर्वक मन पराइयो।",
            updatePost: "पोस्टलाई सफलतापूर्वक अपडेट गरियो।",
            createPost: "पोस्ट सफलतापूर्वक बनाइयो।",
            deletePost: "पोस्टलाई सफलतापूर्वक हटाइयो।",
            bookmarkPost: "पोस्टलाई सफलतापूर्वक बुकमार्क गरियो।",
            likePost: "पोस्टलाई सफलतापूर्वक मन पराइयो।",
            uploadImage: "केवल तस्वीरहरू अपलोड गर्न पाइन्छ।",
            limitedTags: "प्रति पोस्टमा मात्र ट्यागहरू अनुमति छ।",
            updatedProfile: "प्रयोगकर्ता प्रोफाइललाई सफलतापूर्वक अपडेट गरियो।",
            createdProfile: "प्रयोगकर्ता प्रोफाइल सफलतापूर्वक बनाइयो।",
            updateCoverImage: "कवर छवि सफलतापूर्वक अपडेट गरियो।",
            updateProfileImage: "प्रोफाइल छवि सफलतापूर्वक अपडेट गरियो।",
            followUser: "प्रयोगकर्तालाई सफलतापूर्वक अनुसरण गरियो।",
            unfollowUser: "प्रयोगकर्तालाई सफलतापूर्वक अनफलो गरियो।",
          },
          validationMessages: {
            firstName: "पहिलो नाम कम्तिमा 3 अक्षर हुनुपर्छ",
            maxFirstName: "पहिलो नाम अधिकतम 255 अक्षर हुनुपर्छ",
            lastName: "थर कम्तिमा 3 अक्षर हुनुपर्छ",
            maxLastName: "थर अधिकतम 255 अक्षर हुनुपर्छ",
            validEmail: "वैध इमेल हुनुपर्छ",
            minPassword: "पासवर्ड कम्तिमा 8 अक्षरलामा हुनुपर्छ",
            maxPassword: "पासवर्ड अधिकतम 30 अक्षरलामा हुनुपर्छ",
            passwordRequirement:
              "पासवर्डमा कम्तिमा एक उच्चाक्षर, एक न्यूनाक्षर र एक अंक हुनुपर्छ",
            confPassReq: "पासवर्ड पुनः प्रविष्ट गर्नुपर्छ",
            acceptTOC: "तपाईंले नियम र सर्तहरू स्वीकार गर्नुपर्छ",
            matchPassword: "पासवर्डहरू मेल खान्छैनन्",
            requirePassword: "पासवर्ड आवश्यक छ",
            bio: "बायो कम्तिमा 10 अक्षर हुनुपर्छ",
            maxBio: "बायो अधिकतम 255 अक्षर हुनुपर्छ",
            chatMessage: "संदेश कम्तिमा 1 अक्षर हुनुपर्छ।",
            postContent: "पोस्ट सामग्री कम्तिमा 3 अक्षर हुनुपर्छ।",
            commentContent: "कमेन्ट कम्तिमा 3 अक्षर हुनुपर्छ।",
          },
        },
      },
    },
  });

export default i18n;

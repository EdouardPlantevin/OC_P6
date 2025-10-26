package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.mapper.AppUserMapper;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.UserCredentials;
import com.openclassrooms.mddapi.model.UserRegister;
import com.openclassrooms.mddapi.model.UserToUpdate;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AppUserMapper appUserMapper;

    /**
     * Saves a new user to the database.
     * 
     * @param userRegister the user to save
     * @throws ResponseStatusException if the login already exists
     */
    public void saveUser(UserRegister userRegister) {

        if (isLoginExists(userRegister.email()) || isLoginExists(userRegister.username())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                userRegister.email() + " already exist"
            );
        }

        AppUser appUser = new AppUser();
        appUser.setEmail(userRegister.email());
        appUser.setUsername(userRegister.username());
        appUser.setPassword(passwordEncoder.encode(userRegister.password()));

        userRepository.save(appUser);
    }

    /**
     * Authenticates a user using the provided credentials and generates a JWT token.
     *
     * @param credentials the user credentials containing login and password
     * @return a LoginResponse object containing the generated token, user ID, email, and username
     * @throws RuntimeException if the user with the provided login is not found
     */
    public LoginResponse authenticateUser(UserCredentials credentials) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                credentials.login(),
                credentials.password()
        );
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        
        String token = jwtService.createToken(authentication);
        
        AppUser user = userRepository.findByLogin(credentials.login())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        var userDto = appUserMapper.toDto(user);
        
        return new LoginResponse(
                token,
                userDto.id(),
                userDto.email(),
                userDto.username()
        );
    }

    /**
     * Updates the details of an existing user identified by the username in the provided JWT.
     * The user can update their email, username, and optionally their password.
     * If a new password is provided, it must comply with the required pattern:
     * at least one uppercase letter, one lowercase letter, one number, one special character,
     * and a minimum length of 8 characters.
     *
     * @param userToUpdate the updated user details, including the new email, username, and optionally a password
     * @param jwt the JWT containing the logged-in user's authentication details
     * @throws ResponseStatusException if the user is unauthorized or if the new password does not meet the required pattern
     */
    public void updateUser(UserToUpdate userToUpdate, Jwt jwt) {
        AppUser appUser = userRepository.findByUsername(jwt.getSubject())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        appUser.setEmail(userToUpdate.email());
        appUser.setUsername(userToUpdate.username());

        String newPassword = userToUpdate.password();

        if (newPassword != null && !newPassword.isBlank()) {
            String passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

            if (!newPassword.matches(passwordPattern)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            appUser.setPassword(passwordEncoder.encode(newPassword));
        }

        userRepository.save(appUser);
    }


    private boolean isLoginExists(String login) {
        Optional<AppUser> user = userRepository.findByLogin(login);
        return user.isPresent();
    }

}

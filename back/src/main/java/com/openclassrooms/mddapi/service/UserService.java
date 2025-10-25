package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.exception.EmailAlreadyExistException;
import com.openclassrooms.mddapi.mapper.AppUserMapper;
import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.UserCredentials;
import com.openclassrooms.mddapi.model.UserRegister;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AppUserMapper appUserMapper;

    public void saveUser(UserRegister userRegister) {

        if (isEmailExists(userRegister.email())) {
            throw new EmailAlreadyExistException(userRegister.email());
        }

        AppUser appUser = new AppUser();
        appUser.setEmail(userRegister.email());
        appUser.setUsername(userRegister.username());
        appUser.setPassword(passwordEncoder.encode(userRegister.password()));

        userRepository.save(appUser);
    }

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
                userDto.username(),
                userDto.themes()
        );
    }

    private boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}

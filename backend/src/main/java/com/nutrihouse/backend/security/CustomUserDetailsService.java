package com.nutrihouse.backend.security;

import com.nutrihouse.backend.model.User;
import com.nutrihouse.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
    .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con email: " + email));
        
        return new CustomUserDetails(user);
    }
}

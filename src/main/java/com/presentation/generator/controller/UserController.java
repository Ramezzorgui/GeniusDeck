package com.presentation.generator.controller;

import com.presentation.generator.entity.Role;
import com.presentation.generator.entity.User;
import com.presentation.generator.repository.UserRepository;
import com.presentation.generator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users")
 public class UserController {

    @Autowired
    private UserRepository userRepository;
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // ✅ GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ GET user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ POST create new user
    @PostMapping("/add")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // ✅ PUT update user by ID
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // ✅ DELETE user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/count")
    public Map<String, Long> getUserCount() {
        long count = userRepository.count();
        return Collections.singletonMap("count", count);
    }

    @GetMapping("/roles-count")
    public Map<String, Long> getUserRolesCount() {
        Map<String, Long> counts = new HashMap<>();
        for (Role role : Role.values()) {
            counts.put(role.name(), userRepository.countByRole(role));
        }
        return counts;
    }

    @GetMapping("/active-monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyActiveUsers() {
        Map<String, Object> response = userService.getMonthlyActiveUsers();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<?> updateImageUrl(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String imageUrl = request.get("imageUrl");
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setImageUrl(imageUrl);
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Image URL updated"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<?> blockUser(@PathVariable Long id) {
        userService.blockUser(id);
        return ResponseEntity.ok().body("Utilisateur bloqué avec succès");
    }

    @PutMapping("/{id}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {
        userService.unblockUser(id);
        return ResponseEntity.ok().body("Utilisateur débloqué avec succès");
    }


}

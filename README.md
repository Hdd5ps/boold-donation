# Blood Donation App 🩸

A comprehensive React Native application that connects blood donors with recipients, helping save lives through efficient blood donation management.

## Features ✨

### For Donors
- **User Registration & Profile Management**: Create detailed donor profiles with blood type, medical history, and contact information
- **Donation Scheduling**: Book appointments at nearby blood banks and donation centers
- **Donation History**: Track past donations and view impact statistics
- **Emergency Notifications**: Receive urgent requests for your blood type in nearby locations
- **Find Donation Centers**: Locate nearby blood banks and donation drives

### For Recipients/Hospitals
- **Blood Request System**: Submit urgent or scheduled blood requests with specific requirements
- **Donor Search**: Find compatible donors based on blood type and location
- **Real-time Communication**: Direct contact with available donors via call or message
- **Request Tracking**: Monitor the status of blood requests and responses

### General Features
- **Location-based Services**: GPS integration for finding nearby donors and centers
- **Push Notifications**: Real-time alerts for blood requests and donation reminders
- **Blood Type Compatibility**: Educational information about blood donation compatibility
- **Multi-language Support**: Available in multiple languages for wider accessibility
- **Dark/Light Theme**: User-preferred interface themes

## Tech Stack 🛠️

- **Frontend**: React Native 0.73.0
- **Navigation**: React Navigation 6.x
- **State Management**: Context API with useReducer
- **UI Components**: Custom components with React Native Vector Icons
- **Notifications**: React Native Push Notification
- **Location Services**: React Native Geolocation Service
- **Maps**: React Native Maps
- **Storage**: AsyncStorage for local data persistence
- **HTTP Client**: Axios for API calls
- **Date/Time**: React Native Date Picker

## Prerequisites 📋

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK 11)
- Android SDK

## Installation & Setup 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/blood-donation-app.git
cd blood-donation-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install iOS Dependencies (iOS only)
```bash
cd ios && pod install && cd ..
```

### 4. Android Setup
1. Open Android Studio
2. Open the `android` folder in the project
3. Let Android Studio download and install required SDK components
4. Create an AVD (Android Virtual Device) or connect a physical device

### 5. Configure Environment Variables
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://your-api-endpoint.com
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PUSH_NOTIFICATION_KEY=your_push_notification_key
```

## Running the App 🏃‍♂️

### Development Mode

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Metro Bundler
```bash
npm start
```

## Building for Production 🏗️

### Android APK
```bash
cd android
./gradlew assembleRelease
```

### Android App Bundle (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

### iOS (Xcode required)
```bash
npx react-native run-ios --configuration Release
```

## Play Store Deployment 📱

### 1. Prepare Release Build
1. Generate a signed APK or App Bundle using the commands above
2. Ensure all app icons and splash screens are properly configured
3. Update version code and version name in `android/app/build.gradle`

### 2. Play Store Console Setup
1. Create a Google Play Developer account
2. Create a new app in Play Store Console
3. Fill in app details, descriptions, and screenshots
4. Upload the signed App Bundle
5. Configure app pricing and distribution

### 3. Required Assets for Play Store
- **App Icon**: 512x512 PNG
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: Various device sizes
- **Privacy Policy**: Required for apps handling personal data
- **App Description**: Detailed app functionality description

### 4. App Permissions
The app requests the following permissions:
- **Location**: To find nearby donors and blood banks
- **Phone**: To enable direct calling to donors
- **SMS**: For emergency notifications
- **Internet**: For API calls and data synchronization
- **Camera**: For profile pictures (optional)

## Key Components 🧩

### Authentication
- Login/Register screens with form validation
- User session management with AsyncStorage
- Password encryption and security measures

### Home Dashboard
- Quick action buttons for common tasks
- Urgent blood request notifications
- User statistics and impact metrics
- Blood type compatibility information

### Donation Management
- Schedule donation appointments
- View donation history and certificates
- Track eligibility status and next donation date
- Integration with blood bank calendars

### Request System
- Submit blood requests with urgency levels
- Specify quantity, blood type, and location
- Track request status and responses
- Emergency request broadcasting

### Search & Discovery
- Find donors by blood type and location
- Filter by availability and last donation date
- View donor profiles and contact information
- Integration with maps for directions

## Contributing 🤝

We welcome contributions to improve the Blood Donation App! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React Native best practices
- Use TypeScript for type safety (migration in progress)
- Write unit tests for new features
- Follow the existing code style and conventions
- Update documentation for new features

## API Integration 🔗

The app is designed to work with a backend API. Key endpoints include:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /donors` - Search for donors
- `POST /requests` - Submit blood requests
- `GET /donations` - Get donation history
- `POST /notifications` - Send push notifications

## Security & Privacy 🔒

- All user data is encrypted in transit and at rest
- Personal information is only shared with explicit consent
- Location data is used only for finding nearby matches
- GDPR and HIPAA compliance for data protection
- Regular security audits and updates

## Testing 🧪

### Run Tests
```bash
npm test
```

### End-to-End Testing
```bash
npm run e2e:android
npm run e2e:ios
```

## Troubleshooting 🔧

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build failures**: Clean build with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean build folder in Xcode
4. **Permission issues**: Ensure all required permissions are properly configured

### Performance Optimization
- Use Hermes engine for better performance
- Implement lazy loading for screens
- Optimize images and assets
- Use FlatList for large data sets

## Roadmap 🗺️

### Upcoming Features
- [ ] Real-time chat between donors and recipients
- [ ] Integration with hospital management systems
- [ ] AI-powered donor matching algorithms
- [ ] Blockchain-based donation verification
- [ ] Telemedicine integration for health checks
- [ ] Multi-language support expansion
- [ ] Advanced analytics and reporting
- [ ] Integration with wearable devices

## Support & Contact 📞

For support, feature requests, or bug reports:

- Email: support@blooddonationapp.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/blood-donation-app/issues)
- Documentation: [Wiki](https://github.com/yourusername/blood-donation-app/wiki)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- React Native community for excellent documentation and support
- Blood donation organizations worldwide for their life-saving work
- Open source contributors who make projects like this possible
- Healthcare professionals who provided domain expertise

---

**Made with ❤️ for saving lives through technology**

*"Every drop counts, every donation matters."*
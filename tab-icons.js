 screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'HomeScreen') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'History') {
        iconName = focused ? 'md-file-tray-stacked' : 'ios-file-tray-stacked-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#F76E11',
    tabBarInactiveTintColor: 'gray',
  })}

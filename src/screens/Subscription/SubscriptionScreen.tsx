import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllPackages, useGetSubscriptionByUser, useCreateSubscription } from './Subscription.api';
import { useThemeColors } from '../../hooks/useThemeColors';
import GoBack from '../../components/ui/GoBack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Package } from './Subscription.type';

export default function SubscriptionScreen() {
  const colors = useThemeColors();
  const { data: packages, isLoading: loadingPackages } = useGetAllPackages();
  const { data: userSubResponse, isLoading: loadingUserSub } = useGetSubscriptionByUser();
  const { mutate: createSubscription, isPending: creatingSub } = useCreateSubscription();

  const handleSubscribe = (pkg: Package) => {
    Alert.alert(
      'Confirm Subscription',
      `Are you sure you want to subscribe to ${pkg.name} for $${pkg.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: () => {
            createSubscription(pkg.id, {
              onSuccess: () => {
                Alert.alert('Success', 'Subscribed successfully!');
              },
              onError: (error: any) => {
                Alert.alert('Error', error?.response?.data?.message || 'Failed to subscribe');
              }
            })
          }
        }
      ]
    );
  };

  const activeSubscription = userSubResponse?.subscription;
  const activePackageId = activeSubscription?.packageId;

  // Find the active package from the packages list, or use the one from subscription response
  const activePackage = packages?.find((p: Package) => p.id === activePackageId) || activeSubscription?.package;

  const renderPackage = (pkg: Package, isActive: boolean = false) => {
    const isGold = pkg.name.toLowerCase().includes('gold') || pkg.price > 50;
    const isDark = colors.background === '#000000';

    return (
      <View
        key={pkg.id + (isActive ? '_active' : '')}
        style={[
          styles.packageCard,
          {
            backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
            borderColor: isActive ? '#4cd964' : (isGold ? '#FFD700' : (isDark ? '#333' : '#eee')),
            borderWidth: isActive || isGold ? 1.5 : 1
          }
        ]}
      >
        {isActive ? (
          <View style={[styles.recommendedBadge, { backgroundColor: '#4cd964' }]}>
            <Text style={[styles.recommendedText, { color: '#fff' }]}>Current Plan</Text>
          </View>
        ) : isGold ? (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        ) : null}

        <View style={styles.packageHeader}>
          <Text style={[styles.packageName, { color: colors.text }]}>{pkg.name}</Text>
          <Text style={[styles.packagePrice, { color: colors.tint }]}>${pkg.price}<Text style={styles.priceDuration}> / {pkg.duration}d</Text></Text>
        </View>

        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={20} color="#4cd964" />
            <Text style={[styles.featureText, { color: colors.text }]}>{pkg.duration} Days Access</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={20} color="#4cd964" />
            <Text style={[styles.featureText, { color: colors.text }]}>Full Gym Facilities</Text>
          </View>
          {isGold && (
            <View style={styles.featureItem}>
              <Icon name="checkmark-circle" size={20} color="#4cd964" />
              <Text style={[styles.featureText, { color: colors.text }]}>Personal Trainer Support</Text>
            </View>
          )}
        </View>

        {isActive && activeSubscription && (
          <View style={[styles.activeSubDetails, { borderTopColor: isDark ? '#333' : '#eee' }]}>
            <View style={styles.detailItem}>
              <Icon name="calendar-outline" size={16} color={isDark ? '#aaa' : '#666'} />
              <Text style={[styles.activeSubText, { color: isDark ? '#ddd' : '#444' }]}>Started: {new Date(activeSubscription.starts_at).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="time-outline" size={16} color={isDark ? '#aaa' : '#666'} />
              <Text style={[styles.activeSubText, { color: isDark ? '#ddd' : '#444' }]}>Ends: {new Date(activeSubscription.ends_at).toLocaleDateString()}</Text>
            </View>
          </View>
        )}

        {!isActive && (
          <TouchableOpacity
            style={styles.subscribeBtnWrapper}
            onPress={() => handleSubscribe(pkg)}
            disabled={creatingSub}
          >
            <LinearGradient
              colors={isGold ? ['#FFD700', '#DAA520'] : ['#2f95dc', '#1e88e5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.subscribeBtn}
            >
              <Text style={[styles.subscribeBtnText, { color: isGold ? '#000' : '#fff' }]}>Select Plan</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <GoBack title="Subscriptions" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loadingUserSub || loadingPackages ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={[styles.loadingText, { color: colors.text }]}>Loading Plans...</Text>
          </View>
        ) : (
          <>
            {activeSubscription && activePackage && (
              <View style={styles.activeSection}>
                <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>My Subscription</Text>
                {renderPackage(activePackage, true)}
              </View>
            )}

            <View style={[styles.packagesSection, { marginTop: activeSubscription ? 10 : 0 }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Plans</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Choose the right subscription for your fitness goals.</Text>

              <View style={styles.packagesList}>
                {packages?.filter((pkg: Package) => pkg.id !== activePackageId).map((pkg: Package) => renderPackage(pkg))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  activeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
  },
  packagesSection: {
    marginTop: 10,
  },
  packagesList: {
    gap: 20,
  },
  packageCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 18,
    right: -32,
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    paddingHorizontal: 35,
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  recommendedText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  packageHeader: {
    marginBottom: 24,
  },
  packageName: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  priceDuration: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  featuresList: {
    marginBottom: 24,
    gap: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  activeSubDetails: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 8,
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeSubText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  subscribeBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
  },
  subscribeBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 14,
  },
  subscribeBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
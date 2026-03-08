import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetSubscriptionByUser } from '../Subscription/Subscription.api';
import { useGetDietPlan, useGenerateDietPlan } from './DaitPlan.api';
import GoBack from '../../components/ui/GoBack';
import { useThemeColors } from '../../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { DietMealItem } from './DaitPlan.type';

export default function DaitPlan() {
  const colors = useThemeColors();

  const { data: userSubResponse, isLoading: loadingSub } = useGetSubscriptionByUser();
  const { data: dietPlanResponse, isLoading: loadingPlan, error: planError, refetch: refetchPlan } = useGetDietPlan();
  const { mutate: generatePlan, isPending: generatingPlan } = useGenerateDietPlan();

  const hasTriggeredGeneration = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const isActiveSub = userSubResponse?.subscription?.is_active || false;
  const dietPlan = dietPlanResponse?.dietPlan;

  // Auto-generate if subscribed but no plan exists
  useEffect(() => {
    if (loadingSub || loadingPlan || generatingPlan) return;

    // If active subscription but plan error (e.g. 404 not found) OR plan is null
    const needsPlan = planError || (dietPlanResponse && !dietPlanResponse.dietPlan);

    if (isActiveSub && needsPlan && !hasTriggeredGeneration.current) {
      hasTriggeredGeneration.current = true;
      setIsGenerating(true);

      generatePlan(undefined, {
        onSuccess: () => {
          refetchPlan().finally(() => setIsGenerating(false));
        },
        onError: () => {
          setIsGenerating(false);
        }
      });
    }
  }, [isActiveSub, planError, dietPlanResponse, loadingSub, loadingPlan, generatingPlan]);

  const renderMealItem = (item: DietMealItem) => {
    const isDark = colors.background === '#000000';
    return (
      <View key={item.id} style={[styles.mealCard, { backgroundColor: isDark ? '#1c1c1e' : '#fff', borderColor: isDark ? '#333' : '#eee' }]}>
        <Image source={{ uri: item.meal.image }} style={styles.mealImage} resizeMode="cover" />
        <View style={styles.mealInfo}>
          <Text style={[styles.mealName, { color: colors.text }]}>{item.meal.name}</Text>
          <Text style={styles.mealQuantity}>Quantity: {item.quantity}g</Text>

          <View style={styles.macrosRow}>
            <View style={styles.macroBadge}>
              <Icon name="flame-outline" size={12} color="#ff3b30" />
              <Text style={styles.macroText}>{item.meal.calories} kcal</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={[styles.macroIcon, { color: '#4cd964' }]}>P</Text>
              <Text style={styles.macroText}>{item.meal.protein}g</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={[styles.macroIcon, { color: '#5ac8fa' }]}>C</Text>
              <Text style={styles.macroText}>{item.meal.carbs}g</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={[styles.macroIcon, { color: '#ffcc00' }]}>F</Text>
              <Text style={styles.macroText}>{item.meal.fats}g</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderSection = (title: string, meals?: DietMealItem[]) => {
    if (!meals || meals.length === 0) return null;
    return (
      <View style={styles.mealSection} key={title}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
        {meals.map(renderMealItem)}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <GoBack title="Diet Plan" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loadingSub ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={[styles.loadingText, { color: colors.text }]}>Checking subscription...</Text>
          </View>
        ) : !isActiveSub ? (
          <View style={styles.centerContainer}>
            <Icon name="lock-closed-outline" size={60} color={colors.tint} style={{ opacity: 0.5, marginBottom: 16 }} />
            <Text style={[styles.notSubscribedText, { color: colors.text }]}>انت لست مشترك</Text>
            <Text style={[styles.notSubscribedSub, { color: colors.text }]}>يرجى الاشتراك للوصول إلى خطة النظام الغذائي الخاصة بك.</Text>
          </View>
        ) : isGenerating || generatingPlan ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4cd964" />
            <Text style={[styles.loadingTitle, { color: colors.text }]}>Generating AI Diet Plan...</Text>
            <Text style={[styles.loadingSub, { color: colors.text }]}>Please wait, this might take a few moments...</Text>
          </View>
        ) : loadingPlan ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={[styles.loadingText, { color: colors.text }]}>Loading your diet plan...</Text>
          </View>
        ) : dietPlan ? (
          <View style={styles.planContainer}>
            <View style={[styles.summaryCard, { backgroundColor: colors.tint }]}>
              <Text style={styles.summaryTitle}>Daily Target</Text>
              <Text style={styles.summaryCalories}>{dietPlan.calories_target} <Text style={styles.summaryKcal}>kcal</Text></Text>
            </View>

            {renderSection('Breakfast', dietPlan.dietMeals?.Breakfast)}
            {renderSection('Lunch', dietPlan.dietMeals?.Lunch)}
            {renderSection('Dinner', dietPlan.dietMeals?.Dinner)}
            {renderSection('Snacks', dietPlan.dietMeals?.Snacks)}
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={[styles.notSubscribedSub, { color: colors.text }]}>Could not load diet plan.</Text>
          </View>
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
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  loadingTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingSub: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  notSubscribedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notSubscribedSub: {
    fontSize: 15,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  planContainer: {
    flex: 1,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryCalories: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  summaryKcal: {
    fontSize: 16,
    fontWeight: 'normal',
    opacity: 0.8,
  },
  mealSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mealCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  mealInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealQuantity: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  macrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  macroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  macroIcon: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 2,
  },
  macroText: {
    fontSize: 11,
    color: '#777',
    fontWeight: '600',
    marginLeft: 2,
  },
});
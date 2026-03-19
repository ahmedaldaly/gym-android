import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    backgroundColor: '#f6f1f1ff',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginBottom: verticalScale(14),
  },
  weightCard: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  weightInfo: {
    flex: 1,
    marginRight: scale(10),
  },
  weightLabel: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(4),
  },
  weightValue: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(8),
  },
  goalLabel: {
    fontSize: moderateScale(14),
  },
  row: {
    flexDirection: 'row',
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: moderateScale(20),
    padding: moderateScale(14),
  },
  cardMargin: {
    marginRight: scale(10),
  },
  cardHeader: {
    marginBottom: verticalScale(12),
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  cardTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: scale(4),
  },
  cardSubtitle: {
    fontSize: moderateScale(11),
    color: '#9CA3AF',
  },
  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
});
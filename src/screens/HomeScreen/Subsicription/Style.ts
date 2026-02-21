import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f6f1f1ff',
  },

  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  activeBadge: {
    backgroundColor: '#D4F5DD',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeText: {
    color: '#1B8F3A',
    fontSize: 12,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  mainText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    color: '#8E8E8E',
  },

  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 2,
  },
});

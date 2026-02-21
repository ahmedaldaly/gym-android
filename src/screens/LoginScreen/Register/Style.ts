import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },

  HeaderContainrt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  textHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  text: {
    fontSize: 13,
    textAlign: 'center',
    color: '#79858F',
    marginVertical: 15,
  },

  form: {
    paddingHorizontal: 20,
    gap: 15,
    marginVertical: 20,
  },

  button: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 55,
    backgroundColor: '#E6E6E6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

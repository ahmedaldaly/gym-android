import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },

  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#5F5F5F',
    marginBottom: 15,
  },

  listContainer: {
    gap: 12,
  },

  /* كل سطر */
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  /* النقطة */
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
    marginTop: 7,
    marginRight: 10,
  },

  listItem: {
    flex: 1,
    fontSize: 16,
    color: '#5F5F5F',
    lineHeight: 22,
  },

  codeContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },

  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },

  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    letterSpacing: 2,
  },

  copyButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  copyButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },

  createButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
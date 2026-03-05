import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Clipboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoBack from '../../components/ui/GoBack'
import { styles } from './Style'
import { useInviteData, useInviteMutation } from './Invite.api'
import SuccessPopup from '../../components/ui/SuccessPopup'
export default function InviteScreen() {
  const { data: inviteData, isLoading } = useInviteData();
  const { mutate: createInvite, isPending: isCreating } = useInviteMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const listData = [
    'Invite your friends using your referral link.',
    'When your friend signs up you both earn rewards.',
    'Collect points and redeem exclusive benefits.'
  ]

  const handleCopy = () => {
    if (inviteData?.code) {
      Clipboard.setString(inviteData.code);
      setShowSuccess(true);
    }
  }

  const handleCreate = () => {
    createInvite();
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBack title="Refer A Friend" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/01a3e00537db8e4bdc4c4440cdf3dbf7b33fe570.png')}
            style={styles.image}
          />
        </View>

        {/* Title + List */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Spread the word, get 10 points
          </Text>

          {/* List */}
          <View style={styles.listContainer}>
            {listData.map((item, index) => (
              <View key={index} style={styles.listRow}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Invite Code Section */}
        <View style={styles.codeContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#1E3A8A" />
          ) : inviteData ? (
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{inviteData.code}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreate}
              disabled={isCreating}
            >
              {isCreating ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.createButtonText}>Create Invite Code</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
      <SuccessPopup visible={showSuccess} message="Invite code copied to clipboard" onClose={() => setShowSuccess(false)} />
    </SafeAreaView>
  )
}
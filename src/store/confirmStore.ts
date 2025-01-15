import { defineStore } from 'pinia'

interface ConfirmState {
  action: () => Promise<void>
  open: boolean
  title: string
  content: string
  actionButtonTitle: string
  cancelButtonTitle: string
  closeAfterAction: boolean
}

export const useConfirmStore = defineStore('confirm', {
  state: (): ConfirmState => ({
    action: async () => {},
    open: false,
    title: 'Title here',
    content: 'Content here',
    actionButtonTitle: 'Action',
    cancelButtonTitle: 'Cancel',
    closeAfterAction: true,
  }),
  getters: {},
  actions: {
    openConfirm(
      action: () => Promise<void>,
      title = 'Title here',
      content = 'Content here',
      actionButtonTitle = 'Action',
      cancelButtonTitle = 'Cancel',
      closeAfterAction = true,
    ) {
      this.action = action
      this.open = true
      this.title = title
      this.content = content
      this.cancelButtonTitle = cancelButtonTitle
      this.actionButtonTitle = actionButtonTitle
      this.closeAfterAction = closeAfterAction
    },
    closeConfirm() {
      this.open = false
    },
    async doAction(): Promise<void> {
      await this.action()
      if (this.closeAfterAction) this.closeConfirm()
    },
  },
  persist: true,
})

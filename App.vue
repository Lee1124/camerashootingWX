<script>
	export default {
		onLaunch() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(res => {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(res=> {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});

					});
					updateManager.onUpdateFailed(res=> {
						// 新的版本下载失败
						// 新的版本下载失败
						uni.showModal({
							title: '提示',
							content: '检查到有新版本，但下载失败，请检查网络设置',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
	@import url("static/css/common-order.css");
</style>

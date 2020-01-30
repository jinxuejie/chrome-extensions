<template>
	<div class="root">
		<label>选择线路:</label>
		<select v-model="path" @mousedown="getList">
			<option v-for="(value,index) in pathsArr" :key="index" :value="value">线路{{changeNum(index+1)}}:<span>{{value}}</span></option>
		</select>
		<button type="button" @click="playedBy">使用该线路播放</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				path: "",
				pathsArr: [
					"http://55jx.top/?url=",
					"http://mimijiexi.top/?url=",
					"http://api.baiyug.vip/index.php?url=",
					"http://playx.top/?url=",
					"http://nitian9.com/?url=",
					"http://19g.top/?url=",
					"http://607p.com/?url=",
					"http://52088.online/?url=",
					"http://bofang.online/?url=",
					"http://play1.online/?url=",
					"http://880kan.com/?url=",
					"https://api.v6.chat/?url="
				]
			}
		},
		methods: {
			changeNum(num) {
				let AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
				if (num < 11) {
					return AA[num]
				} else if (num % 10 === 0) {
					return parseInt(num / 10) + "十"
				} else {
					let shi = (parseInt(num / 10) > 1) ? parseInt(num / 10) : ""
					return shi + "十" + AA[num % 10]
				}
			},
			getList() {
				let me = this
				chrome.storage.sync.get(data => {
					let keysArr = Object.keys(data)
					let regExp = /^https?:\/\/\w*\?url=$/ig
					for (let i = 0; i < keysArr.length; i++) {
						let temp = data[keysArr[i]]
						if (!me.pathsArr.includes(temp) && (keysArr[i] != "vip_key") && regExp.test(temp)) {
							me.pathsArr.push(temp)
						}
					}
				})
			},
			playedBy() {
				let me = this
				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, function(tabs) {
					let title = tabs[0].title
					let url = tabs[0].url
					window.open(me.path + url, title);
				});
			}
		},
		created() {
			this.path = this.pathsArr[0]
			this.getList()
		}
	}
</script>

<style>
	body {
		height: 50px;
		width: 400px;
		font: 16px/50px "微软雅黑";
	}

	.root {
		height: 100%;
		width: 100%;
	}

	.root>label {
		display: inline-block;
		height: 30px;
	}

	.root select {
		display: inline-block;
		width: 200px;
		height: 30px;
		margin: 0 5px;
	}

	.root select span {
		margin-left: 10px;
		display: inline-block;
		overflow: auto;
	}

	.root>button {
		display: inline-block;
		height: 30px;
	}
</style>

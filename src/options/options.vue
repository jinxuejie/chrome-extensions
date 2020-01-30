<template>
	<div id="content">
		<p>配置解析地址:<span style="color: red;">(&nbsp;解析地址格式:&nbsp;http[s]://xxx?url=&nbsp;)</span></p>
		<input type="text" class="path" v-model="path" />
		<button type="button" @click="add">添加该接口</button>
		<button type="button" @click="clear">清除所有新增的接口</button>
		<p class="err" v-show="isShow">{{tip}}</p>
	</div>
	<!-- <button type="button"class="remove">移除该接口</button> -->
</template>

<script>
	export default {
		data() {
			return {
				vip_key: 0,
				path: "",
				isShow: false,
				tip: "输入的解析地址格式有误，请重新输入！",
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
			add() {
				let me = this
				let regExp = /^https?:\/\/\w*\?url=$/ig;
				if (regExp.test(me.path)) {
					me.isShow = false
					if (me.pathsArr.includes(me.path)) {
						me.isShow = true
						me.tip = "该接口地址已经存在,请勿重复添加！"
						return
					}
					//先获取存储键值
					chrome.storage.sync.get(function(data) {
						//获取到所有
						let keysArr = Object.keys(data)
						for (let i = 0; i < keysArr.length; i++) {
							if (data[keysArr[i]] == me.path) {
								me.tip = "该接口地址已经添加,请勿重复添加！"
								me.isShow = true
								return
							}
						}

						if (data.vip_key) {
							me.vip_key = +data.vip_key;
						}
						me.vip_key += 1
						chrome.storage.sync.set({
							["path_url_" + me.vip_key]: me.path,
							"vip_key": me.vip_key
						}, function() {
							me.path = ""
							me.tip = "添加成功！"
							me.isShow = true
						})
					});
				} else {
					me.tip = "输入的解析地址格式有误，请重新输入！"
					me.isShow = true
				}
			},
			clear() {
				let me = this
				chrome.storage.sync.clear(function() {
					me.tip = "清除成功！"
					me.isShow = true
					me.vip_key = 0
				})
			}
		}
	}
</script>

<style scoped>
	#content {
		font: 16px/50px "微软雅黑";
		padding-top: 100px;
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 544px;
	}

	#content>p,
	#content>button {
		height: 30px;
		margin-left: 5px;
	}

	#content>input {
		height: 24px;
		width: 300px;
	}

	.err {
		color: red;
	}
</style>

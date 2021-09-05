$(document).on('keypress', '#username,#password', function (e) {
	let key = e.keyCode;
	if (key == 32) {
		return false;
	}
});
new Vue({
	el: "#loginModal",
	data() {
		return {
			pre_loader: true,
			form: {
				username: login_username,
				password: login_password,
			}
		}

	},
	mounted() {
		this.pre_loader = false
	},
	methods: {
		doLogin() {
			let app = this;
			if (app.form.username.trim().length == 0) {
				$('#username').focus();
				sweetAlert2('warning', '��س��к�������Ͷ��');
			}
			else if (app.form.username.trim().length != 10) {
				$('#username').focus();
				sweetAlert2('warning', '������Ͷ�����١��ͧ');
			}
			else if (app.form.password.trim().length == 0) {
				$('#password').focus();
				sweetAlert2('warning', '��س��кؾ�������');
			}
			else if (app.form.password.trim().length < 5) {
				$('#password').focus();
				sweetAlert2('warning', '�������촵�ͧ�� 6 ����ѡ�â���');
			} else {
				app.pre_loader = true
				axios.post("https://www.ak29king.com/auth/login",
					Qs.stringify(app.form)
					, {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					})
					.then(function (response) {
						app.pre_loader = false
						if (response.data.result) {
							location.href = "dashboard"
						} else {
							sweetAlert2('error', response.data.message);
						}
					}).catch(err => {
						app.pre_loader = false
						sweetAlert2('warning', '����¡����������');
					});
			}
		}
	}
});

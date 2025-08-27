export class AuthModel {
  constructor(email = "", password = "", full_name = "", is_active = true) {
    this.email = email;
    this.password = password;
    this.full_name = full_name;
    this.is_active = is_active;
  }
}

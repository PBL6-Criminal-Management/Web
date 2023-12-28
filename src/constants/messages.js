// System
export const SHORT_NAME_APP = "CRL_MGT";

// Permission
export const ACCESS = "Truy cập";
export const ADD = "Thêm";
export const EDIT = "Sửa";
export const DELETE = "Xóa";
export const NOT_VIEW_CRIMINAL_INFOR_PERMISSION = "Bạn không có quyền xem thông tin tội phạm này!";
export const NOT_EDIT_ACCOUNT_PERMISSION = "Bạn không có quyền chỉnh sửa thông tin tài khoản này!";
export const NOT_EDIT_ROLE_PERMISSION = "Bạn không có quyền chỉnh sửa chức vụ cho tài khoản này!";
export const NOT_EDIT_IS_ACTIVE_PERMISSION =
  "Bạn không có quyền chỉnh sửa trạng thái kích hoạt của tài khoản này!";
export const NOT_VIEW_ACCOUNT_INFOR_PERMISSION = "Bạn không có quyền xem thông tin tài khoản này!";

//Messages
export const ACCOUNT_IS_NOT_CORRECT = "Tên người dùng hoặc mật khẩu không đúng.";
export const ACCOUNT_IS_NOT_EXIST = "Tài khoản không tồn tại hoặc đã bị xoá.";
export const ACCOUNT_IS_NOT_ACTIVE = "Tài khoản chưa được kích hoạt để đăng nhập vào hệ thống.";

export const INVALID_TOKEN = "Token không hợp lệ";
export const INVALID_REFRESH_TOKEN =
  "RefreshToken không hợp lệ hoặc đã hết hạn! Vui lòng đăng nhập lại!";

export const NOT_FOUND_MSG = "Không thể tìm thấy dữ liệu phù hợp!";
export const DELETE_USER = "Xóa người dùng thành công!";
export const DELETE_SUCCESS = "Xóa thành công!";
export const DELETE_CASE = "Xóa vụ án thành công";
export const DELETE_REPORT = "Xóa bản tố giác tội phạm thành công";
export const SYS_ERROR = "Lỗi hệ thống!";
export const NOT_FOUND_EMAIL = "Không tìm thấy email!";
export const NOT_FOUND_ROLE = "Không tìm thấy vai trò phù hợp!";
export const NOT_FOUND_INVESTIGATOR = "Không tìm thấy dữ liệu điều tra viên phù hợp!";
export const UNKNOWN_ERROR = "Không thể thêm dữ liệu vào cơ sở dữ liệu vì lỗi không xác định!";

export const INVALID_PHONE_NUMBER = "Số điện thoại không hợp lệ!";
export const INVALID_EMAIL = "Email không hợp lệ!";
export const INVALID_USER_NAME = "Tên người dùng không hợp lệ!";
export const INVALID_PASSWORD = "Mật khẩu không hợp lệ!";
export const NOT_MATCH_PASSWORD = "Mật khẩu xác nhận không khớp với mật khẩu mới!";
export const PHONE_NUMBER_EXISTS_MSG = "Số điện thoại đã tồn tại trong cơ sở dữ liệu!";
export const FACEBOOK_EXISTS_MSG = "Facebook đã tồn tại trong cơ sở dữ liệu";
export const PHONE_NUMBER_WITNESS_EXISTS_MSG =
  "Số điện thoại của nhân chứng đã tồn tại trong cơ sở dữ liệu!";
export const PHONE_NUMBER_VICTIM_EXISTS_MSG =
  "Số điện thoại của nạn nhân đã tồn tại trong cơ sở dữ liệu!";
export const EMAIL_EXISTS_MSG = "Email đã tồn tại trong cơ sở dữ liệu!";
export const USERNAME_EXISTS_MSG = "Tên người dùng đã tồn tại trong cơ sở dữ liệu!";
export const CITIZEN_ID_EXISTS_MSG = "CMND hoặc CCCD đã tồn tại trong cơ sở dữ liệu!";
export const CITIZEN_ID_REPEAT = "CMMD hoặc CCCD bị trùng";
export const CHANGE_ROLE_FAIL = "Thay đổi role không thành công";
export const NOT_FOUND_CRIMINAL = "Không tìm thấy tội phạm phù hợp!";

export const NOT_CORRECT_DATE_FORMAT = "Ngày nhập không đúng định dạng!";
export const INCORRECT_PASSWORD = "Mật khẩu cũ không đúng!";
export const PASSWORD_TOO_SHORT = "Mật khẩu mới quá ngắn, hãy nhập mật khẩu từ 8 ký tự trở lên!";
export const PASSWORD_REQUIRE_DIGIT = "Mật khẩu phải có ít nhất 1 chữ số!";
export const PASSWORD_REQUIRE_LOWER = "Mật khẩu phải có ít nhất 1 kí tự viết thường!";
export const PASSWORD_REQUIRE_NON_ALPHANUMERIC = "Mật khẩu không thể chứa chữ và số!";
export const PASSWORD_REQUIRE_UPPER = "Mật khẩu phải có ít nhất 1 kí tự viết hoa!";

export const CHANGE_PASSWORD_SUCCESSFULLY = "Thay đổi mật khẩu thành công!";
export const SEND_EMAIL_SUCCESSFULLY = "Đã gửi thông tin thay đổi mật khẩu qua email của bạn!";

export const RESET_PASSWORD_SUCCESSFULLY = "Thiết lập lại mật khẩu thành công!";

export const YEAR_MUST_NOT_BE_NEGATIVE = "Năm không thể là số âm!";
export const INVALID_MONTH = "Tháng chỉ có giá trị từ 1 - 12!";

export const USER_HAVE_NOT_ROLE =
  "Người dùng này chưa có chức vụ nên tự động bỏ qua cập nhật trường chức vụ và trường kích hoạt!";

export const USER_HAVE_NOT_EMAIL =
  "Người dùng này không có email để thông báo mật khẩu sau khi thiết lập lại!";

export const NUMBER_IMAGES_EACH_SECOND_MUST_BE_POSITIVE = "Số ảnh mỗi giây phải là 1 số dương!";

//File message
export const FILE_IS_NOT_IMAGE =
  "Tệp cung cấp không phải là ảnh hoặc có phần đuôi mở rộng không hợp lệ!";
export const FILE_IS_NOT_VIDEO =
  "Tệp cung cấp không phải là video hoặc có phần đuôi mở rộng không hợp lệ!";
export const FILE_TYPE_IS_INVALID = "Kiểu tệp không hợp lệ!";
export const IMAGE_LENGTH_IS_TOO_BIG = "Ảnh vượt quá kích thước tối đa cho phép!";
export const VIDEO_LENGTH_IS_TOO_BIG = "Video vượt quá kích thước tối đa cho phép!";

//AI Model
export const UNKNOWN = "Không nhận diện ra";
export const AI_MODEL_HAS_NOT_TRAINED_YET = "Mô hình AI chưa được huấn luyện!";
export const NOT_FOUND_IMAGE_TO_TRAIN = "Không tìm thấy ảnh nào để huấn luyện!";
export const AI_MODEL_HAS_TRAINED_SUCCESSFULLY = "Mô hình AI được huấn luyện thành công!";
export const TRAINED_IMAGES_FOLDER_NAME = "TrainedImages";
export const MAX_IMAGE_SIZE_FOR_FREE_AISERVER = 2300000;
export const DEFAULT_FRAMES_NUMBER_EACH_SECOND = 3;

//Required
export const REQUIRED_NAME = "Họ và tên không được để trống";
export const REQUIRED_CITIZEN_ID = "CMND/CCCD không được để trống";
export const REQUIRED_ADDRESS = "Địa chỉ không được để trống";
export const REQUIRED_PHONENUMBER = "Số điện thoại không được để trống";
export const REQUIRED_EMAIL = "Email không được để trống";
export const REQUIRED_USERNAME = "Tên người dùng không được để trống";
export const REQUIRED_PASSWORD = "Mật khẩu chỉ có thể có từ 8 đến 100 ký tự!";
export const REQUIRED_IMAGE = "Đường dẫn ảnh không được để trống";
export const REQUIRED_DESCRIPTION = "Mô tả không được để trống";
export const REQUIRED_NOTE = "Nội dung không được để trống";
export const REQUIRED_ANOTHER_NAME = "Tên khác không được để trống";
export const REQUIRED_PHONE_MODEL = "Model điện thoại không được để trống";
export const REQUIRED_CAREER_AND_WORKPLACE = "Nghề nghiệp và nơi làm việc không được để trống";
export const REQUIRED_CHARACTERISTICS = "Tính cách không được để trống";
export const REQUIRED_HOME_TOWN = "Quê quán không được để trống";
export const REQUIRED_ETHNICITY = "Dân tộc không được để trống";
export const REQUIRED_RELIGION = "Tôn giáo không được để trống";
export const REQUIRED_NATIONALITY = "Quốc tịch không được để trống";
export const REQUIRED_FATHER_NAME = "Tên bố của tội phạm không được để trống";
export const REQUIRED_FATHER_CITIZEN_ID = "CMND/CCCD của bố tội phạm không được để trống";
export const REQUIRED_MOTHER_NAME = "Tên mẹ của tội phạm không được để trống";
export const REQUIRED_MOTHER_CITIZEN_ID = "CMND/CCCD của mẹ tội phạm không được để trống";
export const REQUIRED_PERMANENT_RESIDENCE = "Địa chỉ thường trú không được để trống";
export const REQUIRED_CURRENT_ACCOMMODATION = "Địa chỉ hiện tại không được để trống";
export const REQUIRED_CURRENT_ACTIVITY = "Hoạt động hiện hành không được để trống";
export const REQUIRED_WANTED_DECISION_NO = "Số ra quyết định không được để trống";
export const REQUIRED_DECISION_MAKING_UNIT = "Đơn vị ra quyết định không được để trống";
export const REQUIRED_ENTRY_AND_EXIT_INFORMATION = "Thông tin xuất nhập cảnh không được để trống";
export const REQUIRED_FACEBOOK = "Facebook không được để trống";
export const REQUIRED_ZALO = "Zalo không được để trống";
export const REQUIRED_OTHER_SOCIAL_NETWORKS = "Mạng xã hội khác không được để trống";
export const REQUIRED_GAME_ACCOUNT = "Tài khoản game không được để trống";
export const REQUIRED_BANK_ACCOUNT = "Tài khoản ngân hàng không được để trống";
export const REQUIRED_VEHICLES = "Phương tiện không được để trống";
export const REQUIRED_DANGEROUS_LEVEL = "Mức độ nguy hiểm không được để trống";
export const REQUIRED_OTHER_INFORMATION = "Thông tin khác không được để trống";
export const REQUIRED_REASON = "Lí do không được để trống";
export const REQUIRED_MURDER_WEAPON = "Hung khí không được để trống";
export const REQUIRED_WEAPON = "Vũ khí không được để trống";
export const REQUIRED_CHARGE = "Tội danh không được để trống";
export const REQUIRED_CRIME_SCENE = "Địa điểm xảy ra vụ án không được để trống";
export const REQUIRED_REPORTER_NAME = "Họ và tên của người tố giác tội phạm không được để trống";
export const REQUIRED_REPORTER_EMAIL = "Email của người tố giác tội phạm không được để trống";
export const REQUIRED_REPORTER_PHONE =
  "Số điện thoại của người tố giác tội phạm không được để trống";
export const REQUIRED_REPORTER_ADDRESS = "Địa chỉ của người tố giác tội phạm không được để trống";

//Limit length
export const LIMIT_NAME = "Tên không được vượt quá 100 ký tự!";
export const LIMIT_CITIZEN_ID = "CMND/CCCD không được vượt quá 12 ký tự!";
export const LIMIT_ADDRESS = "Địa chỉ không được vượt quá 200 ký tự!";
export const LIMIT_PHONENUMBER = "Số điện thoại không được vượt quá 15 ký tự!";
export const LIMIT_EMAIL = "Email không được vượt quá 100 ký tự!";
export const LIMIT_USERNAME = "Tên người dùng không được vượt quá 50 ký tự!";
export const LIMIT_PASSWORD = "Mật khẩu chỉ có thể có từ 8 đến 100 ký tự!";
export const LIMIT_IMAGE = "Đường dẫn ảnh không được vượt quá 500 ký tự!";
export const LIMIT_DESCRIPTION = "Mô tả không được vượt quá 500 ký tự!";
export const LIMIT_NOTE = "Nội dung không được vượt quá 500 ký tự!";
export const LIMIT_ANOTHER_NAME = "Tên khác không được vượt quá 100 ký tự!";
export const LIMIT_PHONE_MODEL = "Model điện thoại không được vượt quá 100 ký tự!";
export const LIMIT_CAREER_AND_WORKPLACE =
  "Nghề nghiệp và nơi làm việc không được vượt quá 300 ký tự!";
export const LIMIT_CHARACTERISTICS = "Tính cách không được vượt quá 500 ký tự!";
export const LIMIT_HOME_TOWN = "Quê quán không được vượt quá 200 ký tự!";
export const LIMIT_ETHNICITY = "Dân tộc không được vượt quá 50 ký tự!";
export const LIMIT_RELIGION = "Tôn giáo không được vượt quá 50 ký tự!";
export const LIMIT_NATIONALITY = "Quốc tịch không được vượt quá 50 ký tự!";
export const LIMIT_FATHER_NAME = "Tên bố của tội phạm không được vượt quá 100 ký tự!";
export const LIMIT_FATHER_CITIZEN_ID = "CMND/CCCD của bố tội phạm không được vượt quá 12 ký tự!";
export const LIMIT_MOTHER_NAME = "Tên mẹ của tội phạm không được vượt quá 100 ký tự!";
export const LIMIT_MOTHER_CITIZEN_ID = "CMND/CCCD của mẹ tội phạm không được vượt quá 12 ký tự!";
export const LIMIT_PERMANENT_RESIDENCE = "Địa chỉ thường trú không được vượt quá 200 ký tự!";
export const LIMIT_CURRENT_ACCOMMODATION = "Địa chỉ hiện tại không được vượt quá 200 ký tự!";
export const LIMIT_CURRENT_ACTIVITY = "Hoạt động hiện hành không được vượt quá 200 ký tự!";
export const LIMIT_WANTED_DECISION_NO = "Số ra quyết định không được vượt quá 50 ký tự!";
export const LIMIT_DECISION_MAKING_UNIT = "Đơn vị ra quyết định không được vượt quá 100 ký tự!";
export const LIMIT_ENTRY_AND_EXIT_INFORMATION =
  "Thông tin xuất nhập cảnh không được vượt quá 500 ký tự!";
export const LIMIT_FACEBOOK = "Facebook không được vượt quá 100 ký tự!";
export const LIMIT_ZALO = "Zalo không được vượt quá 100 ký tự!";
export const LIMIT_OTHER_SOCIAL_NETWORKS = "Mạng xã hội khác không được vượt quá 300 ký tự!";
export const LIMIT_GAME_ACCOUNT = "Tài khoản game không được vượt quá 100 ký tự!";
export const LIMIT_BANK_ACCOUNT = "Tài khoản ngân hàng không được vượt quá 30 ký tự!";
export const LIMIT_VEHICLES = "Phương tiện không được vượt quá 100 ký tự!";
export const LIMIT_DANGEROUS_LEVEL = "Mức độ nguy hiểm không được vượt quá 200 ký tự!";
export const LIMIT_OTHER_INFORMATION = "Thông tin khác không được vượt quá 500 ký tự!";
export const LIMIT_REASON = "Lí do không được vượt quá 500 ký tự";
export const LIMIT_MURDER_WEAPON = "Hung khí không được vượt quá 100 ký tự";
export const LIMIT_WEAPON = "Vũ khí không được vượt quá 100 ký tự";
export const LIMIT_CHARGE = "Tội danh không được vượt quá 100 ký tự";
export const LIMIT_CRIME_SCENE = "Địa điểm xảy ra vụ án không được vượt quá 200 ký tự";
export const LIMIT_REPORTER_NAME =
  "Họ và tên của người tố giác tội phạm không được vượt quá 100 ký tự";
export const LIMIT_REPORTER_EMAIL =
  "Email của người tố giác tội phạm không được vượt quá 100 ký tự";
export const LIMIT_REPORTER_PHONE =
  "Số điện thoại của người tố giác tội phạm không được vượt quá 15 ký tự";
export const LIMIT_REPORTER_ADDRESS =
  "Địa chỉ của người tố giác tội phạm không được vượt quá 200 ký tự";
//Error message
export const ERROR_DELETE_IMAGE = "Xóa ảnh không thành công!!!";
export const ERNAL_SERVER_ERROR = "Lỗi server";

//Prefix format
export const CASE = "VA";
export const CRIMINAL = "TP";
export const REPORTING = "BC";
export const TITLE_CONTAINS_SPECIAL_CHARACTERS = "Nội dung chứa ký tự đặc biệt";
export const NAME_CONTAINS_VALID_CHARACTER = "Tên chỉ chứa ký tự chữ, khoảng trắng và dấu nháy đơn";
export const ANOTHER_NAME_CONTAINS_VALID_CHARACTER =
  "Tên khác chỉ chứa ký tự chữ, khoảng trắng và dấu nháy đơn";
export const CITIZEN_ID_VALID_CHARACTER = "CMMD hoặc CCCD chỉ chứa ký tự số";
export const USERNAME_VALID_CHARACTER = "Username chỉ chứa ký tự số, ký tự chữ và khoảng trắng";
export const ADDRESS_VALID_CHARACTER = "Địa chỉ không được chứa ký tự đặc biệt";
export const CHARGE_VALID_CHARACTER = "Tội danh chỉ chứa ký tự chữ, khoảng trắng và dấu phẩy";
export const EVIDENCE_NAME_VALID_CHARACTER =
  "Tên vật chứng chỉ chứa ký tự chữ, ký tự số và khoảng trắng";
export const WEAPON_NAME_VALID_CHARACTER =
  "Vũ khí chỉ chứa ký tự chữ, ký tự số, khoảng trắng và dấu phẩy";
export const WANTED_DECISION_NO_VALID_CHARACTER = "Số quyết định truy nã không chứa ký tự đặc biệt";
export const DECISION_MAKING_UNIT_VALID_CHARACTER =
  "Đơn vị ra quyết định không chứa ký tự đặc biệt";
export const PHONE_MODE_VALID_CHARACTER =
  "Model điện thoại chỉ chứa ký tự số, ký tự chữ và khoảng trắng";
export const CAREER_AND_WORKPLACE_VALID_CHARACTER =
  "Nơi làm việc và chỗ ở không được chứa ký tự đặc biệt";
export const CHARACTERISTICS_VALID_CHARACTER =
  "Tính cách chỉ chứa ký tự chữ, khoảng trắng và dấu phẩy";
export const HOME_TOWN_VALID_CHARACTER = "Quê quán không được chứa ký tự đặc biệt";
export const ETHNICITY_VALID_CHARACTER = "Dân tộc chỉ chứa ký tự chữ";
export const RELIGION_VALID_CHARACTER = "Tôn giáo chỉ chứa ký tự chữ";
export const NATIONALITY_VALID_CHARACTER = "Quốc tịch chỉ chứa ký tự chữ";
export const PERMANENT_RESIDENCE_VALID_CHARACTER =
  "Địa chỉ thường trú không được chứa ký tự đặc biệt";
export const CURRENT_ACCOMMODATION_VALID_CHARACTER =
  "Địa chỉ hiện tại không được chứa ký tự đặc biệt";
export const ENTRY_AND_EXIT_INFORMATION_VALID_CHARACTER =
  "Thông tin xuất nhập cảnh không được chứa ký tự đặc biệt";
export const FACEBOOK_VALID_CHARACTER = "Facebook không được chứa ký tự đặc biệt";
export const ZALO_VALID_CHARACTER = "Zalo chỉ chứa ký tự số";
export const BANK_ACCOUNT_VALID_CHARACTER =
  "Tài khoản ngân hàng chỉ chứa ký tự chữ, ký tự số và khoảng trắng";
export const DANGEROUS_LEVEL_VALID_CHARACTER = "Mức độ nguy hiểm không được chứa ký tự đặt biệt";
export const VEHICLES_VALID_CHARACTER = "Phương tiện không được chứa ký tự đặt biệt";

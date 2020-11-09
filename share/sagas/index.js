import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
// import { NewsTypes } from '../../modules/home/news.reducer'

import { NewsTypes } from '../../modules/entities/news/news.reducer'
import { FacilityTypes } from '../../modules/entities/facility/facility.reducer'
import { FacilityTypeTypes } from '../../modules/entities/facility-type/facility-type.reducer'
import { LicenseTypes } from '../../modules/entities/license/license.reducer'
import { IdPaperTypes } from '../../modules/entities/id-paper/id-paper.reducer'
import { IdPaperTypeTypes } from '../../modules/entities/id-paper-type/id-paper-type.reducer'
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer'
import { InvestigationTypes } from '../../modules/entities/investigation/investigation.reducer'
import { InvesticationFacilityAssociationTypes } from '../../modules/entities/investication-facility-association/investication-facility-association.reducer'
import { InvesticationUserAssociationTypes } from '../../modules/entities/investication-user-association/investication-user-association.reducer'
import { ProductTypes } from '../../modules/entities/product/product.reducer'
import { ProductTypeTypes } from '../../modules/entities/product-type/product-type.reducer'
import { FileTypes } from '../../modules/entities/file/file.reducer'
import { FeedbackTypes } from '../../modules/entities/feedback/feedback.reducer'
import { ContributeReportTypes } from '../../modules/entities/contribute-report/contribute-report.reducer'
import { AddressTypes } from '../../modules/entities/address/address.reducer'
import { DepartmentTypes } from '../../modules/entities/department/department.reducer'
import { PositionTypes } from '../../modules/entities/position/position.reducer'
import { PermisionTypes } from '../../modules/entities/permision/permision.reducer'
import { ReportTypes } from '../../modules/entities/report/report.reducer'
import { SystemLogTypes } from '../../modules/entities/system-logs/system-logs.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
// import { getNew, getNews,} from '../../modules/home/news.sagas'

import { getNew, getNews, updateNews, deleteNews } from '../../modules/entities/news/news.sagas'
import { getFacility, getFacilities, updateFacility, deleteFacility } from '../../modules/entities/facility/facility.sagas'
import {
  getFacilityType,
  getFacilityTypes,
  updateFacilityType,
  deleteFacilityType,
} from '../../modules/entities/facility-type/facility-type.sagas'
import { getLicense, getLicenses, updateLicense, deleteLicense } from '../../modules/entities/license/license.sagas'
import { getIdPaper, getIdPapers, updateIdPaper, deleteIdPaper } from '../../modules/entities/id-paper/id-paper.sagas'
import {
  getIdPaperType,
  getIdPaperTypes,
  updateIdPaperType,
  deleteIdPaperType,
} from '../../modules/entities/id-paper-type/id-paper-type.sagas'
import {
  getNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../../modules/entities/notification/notification.sagas'
import {
  getInvestigation,
  getInvestigations,
  updateInvestigation,
  deleteInvestigation,
} from '../../modules/entities/investigation/investigation.sagas'
import {
  getInvesticationFacilityAssociation,
  getInvesticationFacilityAssociations,
  updateInvesticationFacilityAssociation,
  deleteInvesticationFacilityAssociation,
} from '../../modules/entities/investication-facility-association/investication-facility-association.sagas'
import {
  getInvesticationUserAssociation,
  getInvesticationUserAssociations,
  updateInvesticationUserAssociation,
  deleteInvesticationUserAssociation,
} from '../../modules/entities/investication-user-association/investication-user-association.sagas'
import { getProduct, getProducts, updateProduct, deleteProduct } from '../../modules/entities/product/product.sagas'
import {
  getProductType,
  getProductTypes,
  updateProductType,
  deleteProductType,
} from '../../modules/entities/product-type/product-type.sagas'
import { getFile, getFiles, updateFile, deleteFile } from '../../modules/entities/file/file.sagas'
import { getFeedback, getFeedbacks, updateFeedback, deleteFeedback } from '../../modules/entities/feedback/feedback.sagas'
import {
  getContributeReport,
  getContributeReports,
  updateContributeReport,
  deleteContributeReport,
} from '../../modules/entities/contribute-report/contribute-report.sagas'
import { getAddress, getAddresses, updateAddress, deleteAddress } from '../../modules/entities/address/address.sagas'
import { getDepartment, getDepartments, updateDepartment, deleteDepartment } from '../../modules/entities/department/department.sagas'
import { getPosition, getPositions, updatePosition, deletePosition } from '../../modules/entities/position/position.sagas'
import { getPermision, getPermisions, updatePermision, deletePermision } from '../../modules/entities/permision/permision.sagas'
import { getReport, getReports, updateReport, deleteReport } from '../../modules/entities/report/report.sagas'
import { getSystemLog, getSystemLogs, updateSystemLog, deleteSystemLog } from '../../modules/entities/system-logs/system-logs.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // ATTP accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(NewsTypes.NEWS_REQUEST, getNew, api),
    takeLatest(NewsTypes.NEWS_ALL_REQUEST, getNews, api),

    takeLatest(FacilityTypes.FACILITY_REQUEST, getFacility, api),
    takeLatest(FacilityTypes.FACILITY_ALL_REQUEST, getFacilities, api),
    takeLatest(FacilityTypes.FACILITY_UPDATE_REQUEST, updateFacility, api),
    takeLatest(FacilityTypes.FACILITY_DELETE_REQUEST, deleteFacility, api),

    takeLatest(FacilityTypeTypes.FACILITY_TYPE_REQUEST, getFacilityType, api),
    takeLatest(FacilityTypeTypes.FACILITY_TYPE_ALL_REQUEST, getFacilityTypes, api),
    takeLatest(FacilityTypeTypes.FACILITY_TYPE_UPDATE_REQUEST, updateFacilityType, api),
    takeLatest(FacilityTypeTypes.FACILITY_TYPE_DELETE_REQUEST, deleteFacilityType, api),

    takeLatest(LicenseTypes.LICENSE_REQUEST, getLicense, api),
    takeLatest(LicenseTypes.LICENSE_ALL_REQUEST, getLicenses, api),
    takeLatest(LicenseTypes.LICENSE_UPDATE_REQUEST, updateLicense, api),
    takeLatest(LicenseTypes.LICENSE_DELETE_REQUEST, deleteLicense, api),

    takeLatest(IdPaperTypes.ID_PAPER_REQUEST, getIdPaper, api),
    takeLatest(IdPaperTypes.ID_PAPER_ALL_REQUEST, getIdPapers, api),
    takeLatest(IdPaperTypes.ID_PAPER_UPDATE_REQUEST, updateIdPaper, api),
    takeLatest(IdPaperTypes.ID_PAPER_DELETE_REQUEST, deleteIdPaper, api),

    takeLatest(IdPaperTypeTypes.ID_PAPER_TYPE_REQUEST, getIdPaperType, api),
    takeLatest(IdPaperTypeTypes.ID_PAPER_TYPE_ALL_REQUEST, getIdPaperTypes, api),
    takeLatest(IdPaperTypeTypes.ID_PAPER_TYPE_UPDATE_REQUEST, updateIdPaperType, api),
    takeLatest(IdPaperTypeTypes.ID_PAPER_TYPE_DELETE_REQUEST, deleteIdPaperType, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, getNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, deleteNotification, api),

    takeLatest(InvestigationTypes.INVESTIGATION_REQUEST, getInvestigation, api),
    takeLatest(InvestigationTypes.INVESTIGATION_ALL_REQUEST, getInvestigations, api),
    takeLatest(InvestigationTypes.INVESTIGATION_UPDATE_REQUEST, updateInvestigation, api),
    takeLatest(InvestigationTypes.INVESTIGATION_DELETE_REQUEST, deleteInvestigation, api),

    takeLatest(InvesticationFacilityAssociationTypes.INVESTICATION_FACILITY_ASSOCIATION_REQUEST, getInvesticationFacilityAssociation, api),
    takeLatest(
      InvesticationFacilityAssociationTypes.INVESTICATION_FACILITY_ASSOCIATION_ALL_REQUEST,
      getInvesticationFacilityAssociations,
      api,
    ),
    takeLatest(
      InvesticationFacilityAssociationTypes.INVESTICATION_FACILITY_ASSOCIATION_UPDATE_REQUEST,
      updateInvesticationFacilityAssociation,
      api,
    ),
    takeLatest(
      InvesticationFacilityAssociationTypes.INVESTICATION_FACILITY_ASSOCIATION_DELETE_REQUEST,
      deleteInvesticationFacilityAssociation,
      api,
    ),

    takeLatest(InvesticationUserAssociationTypes.INVESTICATION_USER_ASSOCIATION_REQUEST, getInvesticationUserAssociation, api),
    takeLatest(InvesticationUserAssociationTypes.INVESTICATION_USER_ASSOCIATION_ALL_REQUEST, getInvesticationUserAssociations, api),
    takeLatest(InvesticationUserAssociationTypes.INVESTICATION_USER_ASSOCIATION_UPDATE_REQUEST, updateInvesticationUserAssociation, api),
    takeLatest(InvesticationUserAssociationTypes.INVESTICATION_USER_ASSOCIATION_DELETE_REQUEST, deleteInvesticationUserAssociation, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, getProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, deleteProduct, api),

    takeLatest(ProductTypeTypes.PRODUCT_TYPE_REQUEST, getProductType, api),
    takeLatest(ProductTypeTypes.PRODUCT_TYPE_ALL_REQUEST, getProductTypes, api),
    takeLatest(ProductTypeTypes.PRODUCT_TYPE_UPDATE_REQUEST, updateProductType, api),
    takeLatest(ProductTypeTypes.PRODUCT_TYPE_DELETE_REQUEST, deleteProductType, api),

    takeLatest(FileTypes.FILE_REQUEST, getFile, api),
    takeLatest(FileTypes.FILE_ALL_REQUEST, getFiles, api),
    takeLatest(FileTypes.FILE_UPDATE_REQUEST, updateFile, api),
    takeLatest(FileTypes.FILE_DELETE_REQUEST, deleteFile, api),

    takeLatest(FeedbackTypes.FEEDBACK_REQUEST, getFeedback, api),
    takeLatest(FeedbackTypes.FEEDBACK_ALL_REQUEST, getFeedbacks, api),
    takeLatest(FeedbackTypes.FEEDBACK_UPDATE_REQUEST, updateFeedback, api),
    takeLatest(FeedbackTypes.FEEDBACK_DELETE_REQUEST, deleteFeedback, api),

    takeLatest(ContributeReportTypes.CONTRIBUTE_REPORT_REQUEST, getContributeReport, api),
    takeLatest(ContributeReportTypes.CONTRIBUTE_REPORT_ALL_REQUEST, getContributeReports, api),
    takeLatest(ContributeReportTypes.CONTRIBUTE_REPORT_UPDATE_REQUEST, updateContributeReport, api),
    takeLatest(ContributeReportTypes.CONTRIBUTE_REPORT_DELETE_REQUEST, deleteContributeReport, api),

    takeLatest(AddressTypes.ADDRESS_REQUEST, getAddress, api),
    takeLatest(AddressTypes.ADDRESS_ALL_REQUEST, getAddresses, api),
    takeLatest(AddressTypes.ADDRESS_UPDATE_REQUEST, updateAddress, api),
    takeLatest(AddressTypes.ADDRESS_DELETE_REQUEST, deleteAddress, api),

    takeLatest(DepartmentTypes.DEPARTMENT_REQUEST, getDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_ALL_REQUEST, getDepartments, api),
    takeLatest(DepartmentTypes.DEPARTMENT_UPDATE_REQUEST, updateDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_DELETE_REQUEST, deleteDepartment, api),

    takeLatest(PositionTypes.POSITION_REQUEST, getPosition, api),
    takeLatest(PositionTypes.POSITION_ALL_REQUEST, getPositions, api),
    takeLatest(PositionTypes.POSITION_UPDATE_REQUEST, updatePosition, api),
    takeLatest(PositionTypes.POSITION_DELETE_REQUEST, deletePosition, api),

    takeLatest(PermisionTypes.PERMISION_REQUEST, getPermision, api),
    takeLatest(PermisionTypes.PERMISION_ALL_REQUEST, getPermisions, api),
    takeLatest(PermisionTypes.PERMISION_UPDATE_REQUEST, updatePermision, api),
    takeLatest(PermisionTypes.PERMISION_DELETE_REQUEST, deletePermision, api),

    takeLatest(ReportTypes.REPORT_REQUEST, getReport, api),
    takeLatest(ReportTypes.REPORT_ALL_REQUEST, getReports, api),
    takeLatest(ReportTypes.REPORT_UPDATE_REQUEST, updateReport, api),
    takeLatest(ReportTypes.REPORT_DELETE_REQUEST, deleteReport, api),

    takeLatest(SystemLogTypes.SYSTEM_LOG_REQUEST, getSystemLog, api),
    takeLatest(SystemLogTypes.SYSTEM_LOG_ALL_REQUEST, getSystemLogs, api),
    takeLatest(SystemLogTypes.SYSTEM_LOG_UPDATE_REQUEST, updateSystemLog, api),
    takeLatest(SystemLogTypes.SYSTEM_LOG_DELETE_REQUEST, deleteSystemLog, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ])
}

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    )

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getNew = (newsId) => api.get('api/news/' + newsId)
  const getNews = (options) => api.get('api/news', options)
  const createNews = (news) => api.post('api/news', news)
  const updateNews = (news) => api.put('api/news', news)
  const deleteNews = (newsId) => api.delete('api/news/' + newsId)

  const getFacility = (facilityId) => api.get('api/facilities/' + facilityId)
  const getFacilities = (options) => api.get('api/facilities', options)
  const createFacility = (facility) => api.post('api/facilities', facility)
  const updateFacility = (facility) => api.put('api/facilities', facility)
  const deleteFacility = (facilityId) => api.delete('api/facilities/' + facilityId)

  const getFacilityType = (facilityTypeId) => api.get('api/facility-types/' + facilityTypeId)
  const getFacilityTypes = (options) => api.get('api/facility-types', options)
  const createFacilityType = (facilityType) => api.post('api/facility-types', facilityType)
  const updateFacilityType = (facilityType) => api.put('api/facility-types', facilityType)
  const deleteFacilityType = (facilityTypeId) => api.delete('api/facility-types/' + facilityTypeId)

  const getLicense = (licenseId) => api.get('api/licenses/' + licenseId)
  const getLicenses = (options) => api.get('api/licenses', options)
  const createLicense = (license) => api.post('api/licenses', license)
  const updateLicense = (license) => api.put('api/licenses', license)
  const deleteLicense = (licenseId) => api.delete('api/licenses/' + licenseId)

  const getIdPaper = (idPaperId) => api.get('api/id-papers/' + idPaperId)
  const getIdPapers = (options) => api.get('api/id-papers', options)
  const createIdPaper = (idPaper) => api.post('api/id-papers', idPaper)
  const updateIdPaper = (idPaper) => api.put('api/id-papers', idPaper)
  const deleteIdPaper = (idPaperId) => api.delete('api/id-papers/' + idPaperId)

  const getIdPaperType = (idPaperTypeId) => api.get('api/id-paper-types/' + idPaperTypeId)
  const getIdPaperTypes = (options) => api.get('api/id-paper-types', options)
  const createIdPaperType = (idPaperType) => api.post('api/id-paper-types', idPaperType)
  const updateIdPaperType = (idPaperType) => api.put('api/id-paper-types', idPaperType)
  const deleteIdPaperType = (idPaperTypeId) => api.delete('api/id-paper-types/' + idPaperTypeId)

  const getNotification = (notificationId) => api.get('api/notifications/' + notificationId)
  const getNotifications = (options) => api.get('api/notifications', options)
  const createNotification = (notification) => api.post('api/notifications', notification)
  const updateNotification = (notification) => api.put('api/notifications', notification)
  const deleteNotification = (notificationId) => api.delete('api/notifications/' + notificationId)

  const getInvestigation = (investigationId) => api.get('api/investigations/' + investigationId)
  const getInvestigations = (options) => api.get('api/investigations', options)
  const createInvestigation = (investigation) => api.post('api/investigations', investigation)
  const updateInvestigation = (investigation) => api.put('api/investigations', investigation)
  const deleteInvestigation = (investigationId) => api.delete('api/investigations/' + investigationId)

  const getInvesticationFacilityAssociation = (investicationFacilityAssociationId) =>
    api.get('api/investication-facility-associations/' + investicationFacilityAssociationId)
  const getInvesticationFacilityAssociations = (options) => api.get('api/investication-facility-associations', options)
  const createInvesticationFacilityAssociation = (investicationFacilityAssociation) =>
    api.post('api/investication-facility-associations', investicationFacilityAssociation)
  const updateInvesticationFacilityAssociation = (investicationFacilityAssociation) =>
    api.put('api/investication-facility-associations', investicationFacilityAssociation)
  const deleteInvesticationFacilityAssociation = (investicationFacilityAssociationId) =>
    api.delete('api/investication-facility-associations/' + investicationFacilityAssociationId)

  const getInvesticationUserAssociation = (investicationUserAssociationId) =>
    api.get('api/investication-user-associations/' + investicationUserAssociationId)
  const getInvesticationUserAssociations = (options) => api.get('api/investication-user-associations', options)
  const createInvesticationUserAssociation = (investicationUserAssociation) =>
    api.post('api/investication-user-associations', investicationUserAssociation)
  const updateInvesticationUserAssociation = (investicationUserAssociation) =>
    api.put('api/investication-user-associations', investicationUserAssociation)
  const deleteInvesticationUserAssociation = (investicationUserAssociationId) =>
    api.delete('api/investication-user-associations/' + investicationUserAssociationId)

  const getProduct = (productId) => api.get('api/products/' + productId)
  const getProducts = (options) => api.get('api/products', options)
  const createProduct = (product) => api.post('api/products', product)
  const updateProduct = (product) => api.put('api/products', product)
  const deleteProduct = (productId) => api.delete('api/products/' + productId)

  const getProductType = (productTypeId) => api.get('api/product-types/' + productTypeId)
  const getProductTypes = (options) => api.get('api/product-types', options)
  const createProductType = (productType) => api.post('api/product-types', productType)
  const updateProductType = (productType) => api.put('api/product-types', productType)
  const deleteProductType = (productTypeId) => api.delete('api/product-types/' + productTypeId)

  const getFile = (fileId) => api.get('api/files/' + fileId)
  const getFiles = (options) => api.get('api/files', options)
  const createFile = (file) => api.post('api/files', file)
  const updateFile = (file) => api.put('api/files', file)
  const deleteFile = (fileId) => api.delete('api/files/' + fileId)

  const getFeedback = (feedbackId) => api.get('api/feedbacks/' + feedbackId)
  const getFeedbacks = (options) => api.get('api/feedbacks', options)
  const createFeedback = (feedback) => api.post('api/feedbacks', feedback)
  const updateFeedback = (feedback) => api.put('api/feedbacks', feedback)
  const deleteFeedback = (feedbackId) => api.delete('api/feedbacks/' + feedbackId)

  const getContributeReport = (contributeReportId) => api.get('api/contribute-reports/' + contributeReportId)
  const getContributeReports = (options) => api.get('api/contribute-reports', options)
  const createContributeReport = (contributeReport) => api.post('api/contribute-reports', contributeReport)
  const updateContributeReport = (contributeReport) => api.put('api/contribute-reports', contributeReport)
  const deleteContributeReport = (contributeReportId) => api.delete('api/contribute-reports/' + contributeReportId)

  const getAddress = (addressId) => api.get('api/addresses/' + addressId)
  const getAddresses = (options) => api.get('api/addresses', options)
  const createAddress = (address) => api.post('api/addresses', address)
  const updateAddress = (address) => api.put('api/addresses', address)
  const deleteAddress = (addressId) => api.delete('api/addresses/' + addressId)

  const getDepartment = (departmentId) => api.get('api/departments/' + departmentId)
  const getDepartments = (options) => api.get('api/departments', options)
  const createDepartment = (department) => api.post('api/departments', department)
  const updateDepartment = (department) => api.put('api/departments', department)
  const deleteDepartment = (departmentId) => api.delete('api/departments/' + departmentId)

  const getPosition = (positionId) => api.get('api/positions/' + positionId)
  const getPositions = (options) => api.get('api/positions', options)
  const createPosition = (position) => api.post('api/positions', position)
  const updatePosition = (position) => api.put('api/positions', position)
  const deletePosition = (positionId) => api.delete('api/positions/' + positionId)

  const getPermision = (permisionId) => api.get('api/permisions/' + permisionId)
  const getPermisions = (options) => api.get('api/permisions', options)
  const createPermision = (permision) => api.post('api/permisions', permision)
  const updatePermision = (permision) => api.put('api/permisions', permision)
  const deletePermision = (permisionId) => api.delete('api/permisions/' + permisionId)

  const getReport = (reportId) => api.get('api/reports/' + reportId)
  const getReports = (options) => api.get('api/reports', options)
  const createReport = (report) => api.post('api/reports', report)
  const updateReport = (report) => api.put('api/reports', report)
  const deleteReport = (reportId) => api.delete('api/reports/' + reportId)

  const getSystemLog = (systemLogId) => api.get('api/system-logs/' + systemLogId)
  const getSystemLogs = (options) => api.get('api/system-logs', options)
  const createSystemLog = (systemLog) => api.post('api/system-logs', systemLog)
  const updateSystemLog = (systemLog) => api.put('api/system-logs', systemLog)
  const deleteSystemLog = (systemLogId) => api.delete('api/system-logs/' + systemLogId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createNews,
    updateNews,
    getNew,
    getNews,
    deleteNews,

    createFacility,
    updateFacility,
    getFacilities,
    getFacility,
    deleteFacility,

    createFacilityType,
    updateFacilityType,
    getFacilityTypes,
    getFacilityType,
    deleteFacilityType,

    createLicense,
    updateLicense,
    getLicenses,
    getLicense,
    deleteLicense,

    createIdPaper,
    updateIdPaper,
    getIdPapers,
    getIdPaper,
    deleteIdPaper,

    createIdPaperType,
    updateIdPaperType,
    getIdPaperTypes,
    getIdPaperType,
    deleteIdPaperType,

    createNotification,
    updateNotification,
    getNotifications,
    getNotification,
    deleteNotification,

    createInvestigation,
    updateInvestigation,
    getInvestigations,
    getInvestigation,
    deleteInvestigation,

    createInvesticationFacilityAssociation,
    updateInvesticationFacilityAssociation,
    getInvesticationFacilityAssociations,
    getInvesticationFacilityAssociation,
    deleteInvesticationFacilityAssociation,

    createInvesticationUserAssociation,
    updateInvesticationUserAssociation,
    getInvesticationUserAssociations,
    getInvesticationUserAssociation,
    deleteInvesticationUserAssociation,

    createProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,

    createProductType,
    updateProductType,
    getProductTypes,
    getProductType,
    deleteProductType,

    createFile,
    updateFile,
    getFiles,
    getFile,
    deleteFile,

    createFeedback,
    updateFeedback,
    getFeedbacks,
    getFeedback,
    deleteFeedback,

    createContributeReport,
    updateContributeReport,
    getContributeReports,
    getContributeReport,
    deleteContributeReport,

    createAddress,
    updateAddress,
    getAddresses,
    getAddress,
    deleteAddress,

    createDepartment,
    updateDepartment,
    getDepartments,
    getDepartment,
    deleteDepartment,

    createPosition,
    updatePosition,
    getPositions,
    getPosition,
    deletePosition,

    createPermision,
    updatePermision,
    getPermisions,
    getPermision,
    deletePermision,

    createReport,
    updateReport,
    getReports,
    getReport,
    deleteReport,

    createSystemLog,
    updateSystemLog,
    getSystemLogs,
    getSystemLog,
    deleteSystemLog,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  }
}

// let's return back our create method as the default.
export default {
  create,
}

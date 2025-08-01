/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif

// Avoid multiple includes of RNDatePickerSpecs symbols
#ifndef RNDatePickerSpecs_H
#define RNDatePickerSpecs_H

#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>


@protocol NativeRNDatePickerSpec <RCTBridgeModule, RCTTurboModule>

- (void)openPicker:(NSDictionary *)props;
- (void)removeListeners:(double)type;
- (void)addListener:(NSString *)eventName;

@end
namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRNDatePicker'
   */
  class JSI_EXPORT NativeRNDatePickerSpecJSI : public ObjCTurboModule {
  public:
    NativeRNDatePickerSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

#endif // RNDatePickerSpecs_H

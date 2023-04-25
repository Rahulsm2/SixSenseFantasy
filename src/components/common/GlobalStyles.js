import { StyleSheet } from 'react-native';
import {
  OpenSans_Bold,
  OpenSans_Light,
  OpenSans_Medium,
  OpenSans_Regular,
  OpenSans_SemiBold,
  OpenSans_ExtraBold
} from './Constants';

const gstyles = StyleSheet.create({

  container: bg => ({
    flex: 1,
    backgroundColor: bg ? bg : '#fff',
  }),

  OpenSans_Bold: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_Bold,
    color: color ? color : '#000',
    ...styles,
  }),

  OpenSans_ExtraBold: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_ExtraBold,
    color: color ? color : '#000',
    ...styles,
  }),

  OpenSans_Light: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_Light,
    color: color ? color : '#000',
    ...styles,
  }),

  OpenSans_Medium: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_Medium,
    color: color ? color : '#000',
    ...styles,
  }),

  OpenSans_Regular: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_Regular,
    color: color ? color : '#000',
    ...styles,
  }),

  OpenSans_SemiBold: (size, color, styles) => ({
    fontSize: size ? size : 14,
    fontFamily: OpenSans_SemiBold,
    color: color ? color : '#000',
    ...styles,
  }),

  //Margin

  m: (left, top, right, bottom) => ({
    marginLeft: left,
    marginTop: top ? top : left,
    marginRight: right ? right : left,
    marginBottom: bottom ? bottom : left,
  }),

  ms: value => ({
    marginLeft: value,
  }),

  me: value => ({
    marginRight: value,
  }),

  mt: value => ({
    marginTop: value,
  }),

  mb: value => ({
    marginBottom: value,
  }),

  mx: (left, right) => ({
    marginLeft: left,
    marginRight: right ? right : left,
  }),

  my: (top, bottom) => ({
    marginTop: top,
    marginBottom: bottom ? bottom : top,
  }),

  mxy: (x, y) => ({
    marginHorizontal: x,
    marginVertical: y,
  }),

  //Padding

  p: (left, top, right, bottom) => ({
    paddingLeft: left,
    paddingTop: top ? top : left,
    paddingRight: right ? right : left,
    paddingBottom: bottom ? bottom : left,
  }),

  ps: value => ({
    paddingLeft: value,
  }),

  pe: value => ({
    paddingRight: value,
  }),

  pt: value => ({
    paddingTop: value,
  }),

  pb: value => ({
    paddingBottom: value,
  }),

  px: (left, right) => ({
    paddingLeft: left,
    paddingRight: right ? right : left,
  }),

  py: (top, bottom) => ({
    paddingTop: top,
    paddingBottom: bottom ? bottom : top,
  }),

  pxy: (x, y) => ({
    paddingHorizontal: x,
    paddingVertical: y,
  }),

  // IconSize

  iconSize: (width, height) => ({
    width: width,
    height: height ? height : width,
  }),

  //Align

  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inRowJC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inRowJSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  center: {
    alignItems: 'center'
  },

  centerXY: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  centerX: {
    alignSelf: 'center'
  },

  //Divider

  dividerVerticle: {
    width: 1,
    height: '100%',
    backgroundColor: '#e6e6e6',
  },

  dividerHorizontal: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#e6e6e6',
  },

  spaceHorizontal: {
    width: '100%',
    height: 8,
    backgroundColor: '#e8e8e880',
  },

  //Border
  border: (radius, width, color) => ({
    borderRadius: radius,
    width: width,
    height: width,
    borderColor: color,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center'
  }),

  //Placeholder View

  loaderStyle: (width, height, border = 6) => ({
    width: width,
    height: height ? height : width,
    borderRadius: height ? border : width / 2,
  }),

  // width
  size: (width) => ({
    width: width
  })

});

export { gstyles };